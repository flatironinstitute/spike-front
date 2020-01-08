module.exports = imputeMissingValues;

function imputeMissingValues(matrix, opts) {
    let vectors_with_missing_values = [];
    let vectors_without_missing_values = [];
    for (let v of matrix) {
        if (hasMissingValues(v))
            vectors_with_missing_values.push(v);
        else
            vectors_without_missing_values.push(v);
    }
    if (vectors_without_missing_values.length <= 2) {
        // console.warn('Unable to impute missing values because not enough of the data is non-missing');
        return;
    }
    for (let v of vectors_with_missing_values) {
        imputeVector(v, vectors_without_missing_values, opts);
    }
}

function imputeVector(v, A, opts) {
    let missing_inds = [];
    let nonmissing_inds = [];
    for (let i = 0; i < v.length; i++) {
        if (!isNumeric(v[i])) missing_inds.push(i);
        else nonmissing_inds.push(i);
    }
    let A_nonmissing = [];
    let A_missing = [];

    for (let a of A) {
        let a_nonmissing = [];
        for (let j = 0; j < nonmissing_inds.length; j++) {
            a_nonmissing.push(a[nonmissing_inds[j]]);
        }
        A_nonmissing.push(a_nonmissing);
        let a_missing = [];
        for (let j = 0; j < missing_inds.length; j++) {
            a_missing.push(a[missing_inds[j]]);
        }
        A_missing.push(a_missing);
    }
    // add a column of ones for a constant term
    let ones_nonmissing = [];
    for (let j = 0; j < nonmissing_inds.length; j++) ones_nonmissing.push(1);
    A_nonmissing.push(ones_nonmissing);
    let ones_missing = [];
    for (let j = 0; j < missing_inds.length; j++) ones_missing.push(1);
    A_missing.push(ones_missing);

    let v_nonmissing = [];
    for (let j = 0; j < nonmissing_inds.length; j++) {
        v_nonmissing.push(v[nonmissing_inds[j]]);
    }

    let coeffs = fitRegressionCoeffs(v_nonmissing, A_nonmissing, opts.num_pls_components);
    let v_missing_filled_in = applyRegressionCoeffs(A_missing, coeffs);
    for (let j = 0; j < missing_inds.length; j++) {
        v[missing_inds[j]] = v_missing_filled_in[j];
    }
}
function fitRegressionCoeffs(v, A) {
    // we are going to use a version of partial least squares regression
    let Acopy = copyMatrix(A);
    // these will form an orthonormal basis
    let num_pls_components = 4;
    let pls_components = [];
    for (let i = 0; i < num_pls_components; i++) {
        if (matrixIsCloseToZero(Acopy)) {
            break;
        }
        let X = getPLSComponent(v, Acopy);
        deflatePLS(X.component, Acopy);
        pls_components.push(X);
    }
    let pls_weights = [];
    for (let c = 0; c < pls_components.length; c++) {
        let weight0 = innerProduct(pls_components[c].component, v);
        pls_weights.push(weight0);
    }
    let coeffs = [];
    for (let j = 0; j < A.length; j++) coeffs.push(0);
    for (let c = 0; c < pls_components.length; c++) {
        for (let j = 0; j < A.length; j++)
            coeffs[j] += pls_components[c].loadings[j] * pls_weights[c];
    }
    return coeffs;
}
function matrixIsCloseToZero(A) {
    let eps = 0.00001;
    for (let a of A) {
        for (let b of a) {
            if (Math.abs(b) > eps) return false;
        }
    }
    return true;
}
function getPLSComponent(v, A) {
    let m = A.length;
    if (m == 0) return [];
    let n = A[0].length;
    if (n != v.length) {
        throw Error('Unexpected problem in getPLSComponent');
    }
    let loadings = [];
    for (let a of A) {
        loadings.push(innerProduct(a, v));
    }
    let component = [];
    for (let i = 0; i < n; i++) component.push(0);
    for (let j = 0; j < m; j++) {
        for (let i = 0; i < n; i++) component[i] += loadings[j] * A[j][i];
    }
    let norm = Math.sqrt(innerProduct(component, component));
    if (norm > 0) {
        for (let i = 0; i < n; i++) {
            component[i] /= norm;
        }
        for (let j = 0; j < m; j++) {
            loadings[j] /= norm;
        }
    }
    return {
        component: component,
        loadings: loadings
    };
}
function deflatePLS(unitV, A) {
    for (let a of A) {
        let ip = innerProduct(unitV, a);
        for (let i = 0; i < a.length; i++) {
            a[i] -= ip * unitV[i];
        }
    }
}
function innerProduct(v1, v2) {
    let ret = 0;
    for (let i = 0; i < v1.length; i++) {
        ret += v1[i] * v2[i];
    }
    return ret;
}
function copyMatrix(A) {
    let ret = [];
    for (let a of A) {
        ret.push(copyVector(a));
    }
    return ret;
}
function copyVector(v) {
    let ret = [];
    for (let a of v) ret.push(a);
    return ret;
}
function applyRegressionCoeffs(A, coeffs) {
    let m = A.length;
    if (m == 0) return [];
    let n = A[0].length;
    if (m != coeffs.length) {
        throw Error('Unexpected problem in applyRegressionCoeffs');
    }
    let ret = [];
    for (let i = 0; i < n; i++) {
        ret.push(0);
    }
    for (let j = 0; j < m; j++) {
        for (let i = 0; i < n; i++) {
            ret[i] += coeffs[j] * A[j][i];
        }
    }
    return ret;
}

function hasMissingValues(v) {
    for (let a of v) {
        if (!isNumeric(a)) return true;
    }
    return false;
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}