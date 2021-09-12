class Matrix {
  constructor(rows, cols) {
    this.row = rows;
    this.col = cols;
    this.matrix = [];

    for (let i = 0; i < this.row; i++) {
      this.matrix[i] = [];
      for (let j = 0; j < this.col; j++) {
        this.matrix[i][j] = 0;
      }
    }
  }

  copy() {
    let m = new Matrix(this.row, this.col);
    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.col; j++) {
        m.matrix[i][j] = this.matrix[i][j];
      }
    }
    return m;
  }

  scalarMultiply(n) {
    let matrix_ = this;
    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.col; j++) {
        matrix_.matrix[i][j] *= n;
      }
    }

    return matrix_;
  }

  scalarAdd(n) {
    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.col; j++) {
        this.matrix[i][j] += n;
      }
    }
  }


  randomize() {
    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.col; j++) {
        this.matrix[i][j] = Math.random() * 2 - 1;
      }
    }
  }

  elementwiseAdd(matrix_) {
    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.col; j++) {
        this.matrix[i][j] += matrix_.matrix[i][j];
      }
    }
  }

  elementwiseSubtract(matrix_2) {
    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.col; j++) {
        this.matrix[i][j] = this.matrix[i][j] - matrix_2.matrix[i][j];
      }
    }
  }

  static elementwiseSubtract(matrix_1, matrix_2) {
    let output = new Matrix(matrix_1.row, matrix_1.col);
    for (let i = 0; i < matrix_1.row; i++) {
      for (let j = 0; j < matrix_1.col; j++) {
        output.matrix[i][j] = matrix_1.matrix[i][j] - matrix_2.matrix[i][j];
      }
    }

    return output;
  }

  elementwiseMultiply(matrix_) {
    let matrix_1 = this;
    for (let i = 0; i < matrix_1.row; i++) {
      for (let j = 0; j < matrix_1.col; j++) {
        matrix_1.matrix[i][j] *= matrix_.matrix[i][j];
      }
    }
    return matrix_1;
  }

  static matrixProduct(matrix_1, matrix_2) {
    let result = new Matrix(matrix_1.row, matrix_2.col);

    for (let i = 0; i < result.row; i++) {
      for (let j = 0; j < result.col; j++) {

        let sum = 0;

        for (let k = 0; k < matrix_1.col; k++) {
          sum += matrix_1.matrix[i][k] * matrix_2.matrix[k][j];
        }

        result.matrix[i][j] = sum;
      }
    }
    return result;
  }

  matrixProduct(matrix_) {
    let result = new Matrix(this.row, matrix_.col);

    for (let i = 0; i < result.row; i++) {
      for (let j = 0; j < result.col; j++) {

        let sum = 0;

        for (let k = 0; k < this.col; k++) {
          sum += this.matrix[i][k] * matrix_.matrix[k][j];
        }

        result.matrix[i][j] = sum;
      }
    }
    return result;
  }

  transpose() {
    var result = new Matrix(this.col, this.row);

    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.col; j++) {
        result.matrix[j][i] = this.matrix[i][j];
      }
    }

    return result;
  }

  setValue(row_, col_, value_) {
    this.matrix[row_][col_] = value_;
  }

  getValue(row_, col_) {
    return this.matrix[row_][col_];
  }

  print() {
    console.table(this.matrix);
  }

  static array_to_matrix(input) {

    let input_ = new Matrix(input.length, 1);

    for (let i = 0; i < input_.row; i++) {
      input_.setValue(i, 0, input[i]);
    }

    return input_;
  }

  matrix_to_array() {
    let input_ = [];

    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.col; j++) {
        input_.push(this.getValue(i, j));
      }
    }

    return input_;
  }

  map(func) {
    let matrix_ = this;
    for (let i = 0; i < matrix_.row; i++) {
      for (let j = 0; j < matrix_.col; j++) {

        let val = matrix_.matrix[i][j];
        matrix_.matrix[i][j] = func(val, i, j);
      }
    }
    return matrix_;
  }

  static map(matrix_1, func) {
    let matrix_ = matrix_1;
    for (let i = 0; i < matrix_.row; i++) {
      for (let j = 0; j < matrix_.col; j++) {

        let val = matrix_.matrix[i][j];
        matrix_.matrix[i][j] = func(val, i, j);
      }
    }
    return matrix_;
  }
}