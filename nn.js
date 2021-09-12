class ActivationFunction {
  constructor(func, dfunc) {
    this.func = func;
    this.dfunc = dfunc;
  }
}

let sigmoid = new ActivationFunction(
  x => 1 / (1 + Math.exp(-x)),
  y => y * (1 - y)
);

let tanh = new ActivationFunction(
  x => Math.tanh(x),
  y => 1 - (y * y)
);

class NeuralNetwork {
  constructor(NumInput, NumHidden, NumOutput) {
    if (NumInput instanceof NeuralNetwork) {
      let oldNode = NumInput;

      this.input = oldNode.input;
      this.hidden = oldNode.hidden;
      this.output = oldNode.output;

      this.weight_input_hidden = oldNode.weight_input_hidden.copy();
      this.weight_hidden_output = oldNode.weight_hidden_output.copy();

      this.bias_hidden = oldNode.bias_hidden.copy();
      this.bias_output = oldNode.bias_output.copy();
    } else {
      this.input = NumInput;
      this.hidden = NumHidden;
      this.output = NumOutput;

      this.weight_input_hidden = new Matrix(this.hidden, this.input);
      this.weight_hidden_output = new Matrix(this.output, this.hidden);

      this.weight_input_hidden.randomize();
      this.weight_hidden_output.randomize();

      this.bias_hidden = new Matrix(this.hidden, 1);
      this.bias_output = new Matrix(this.output, 1);

      this.bias_hidden.randomize();
      this.bias_output.randomize();
    }

    this.setLearningRate();
    this.setActivationFunction();
  }

  feedforward(input) {
    let input_ = Matrix.array_to_matrix(input);
    let hidden_layer = this.weight_input_hidden.matrixProduct(input_);
    hidden_layer.elementwiseAdd(this.bias_hidden);

    hidden_layer.map(this.activation_function.func);

    let output_layer = this.weight_hidden_output.matrixProduct(hidden_layer);
    output_layer.elementwiseAdd(this.bias_hidden);

    output_layer.map(this.activation_function.func);

    return output_layer;
  }

  setLearningRate() {
    this.lr = 0.1;
  }

  setActivationFunction(func = sigmoid) {
    this.activation_function = func;
  }

  debugWeights() {
    this.weight_input_hidden.print();
    this.weight_hidden_output.print();
  }

  train(input, answer) {
    let input_ = Matrix.array_to_matrix(input);
    let hidden_layer = this.weight_input_hidden.matrixProduct(input_);
    hidden_layer.elementwiseAdd(this.bias_hidden);

    hidden_layer.map(this.activation_function.func);

    let output_layer = this.weight_hidden_output.matrixProduct(hidden_layer);
    output_layer.elementwiseAdd(this.bias_hidden);

    output_layer.map(this.activation_function.func);

    answer = Matrix.array_to_matrix(answer);

    let output_error = Matrix.elementwiseSubtract(answer, output_layer);

    let hidden_t = this.weight_hidden_output.transpose();
    let hidden_error = hidden_t.matrixProduct(output_error);

    let gradient_1 = Matrix.map(output_layer, this.activation_function.dfunc);
    gradient_1 = gradient_1.elementwiseMultiply(output_error);
    gradient_1 = gradient_1.scalarMultiply(this.lr);

    let h_t = hidden_layer.transpose();
    let Weight_delta_1 = Matrix.matrixProduct(gradient_1, h_t);

    this.weight_hidden_output.elementwiseAdd(Weight_delta_1);
    this.bias_output.elementwiseAdd(gradient_1);

    let gradient_2 = Matrix.map(hidden_layer, this.activation_function.dfunc);
    gradient_2 = gradient_2.elementwiseMultiply(hidden_error);
    gradient_2 = gradient_2.scalarMultiply(this.lr);

    let i_t = input_.transpose();
    let Weight_delta_2 = Matrix.matrixProduct(gradient_2, i_t);

    this.weight_input_hidden.elementwiseAdd(Weight_delta_2);

    this.bias_hidden.elementwiseAdd(gradient_2);

  }

  serialize() {
    return JSON.stringify(this);
  }

  static deserialize(data) {
    if (typeof data == 'string') {
      data = JSON.parse(data);
    }

    let nn = new NeuralNetwork(data.input, data.hidden, data.output);
    nn.weight_input_hidden = Matrix.deserialize(data.weight_input_hidden);
    nn.weight_hidden_output = Matrix.deserialize(data.weight_hidden_output);
    nn.bias_hidden = Matrix.deserialize(data.bias_hidden);
    nn.bias_output = Matrix.deserialize(data.bias_output);
    nn.lr = data.lr;
    return nn;
  }

  copy() {
    return new NeuralNetwork(this);
  }

  // Accept an arbitrary function for mutation
  mutate(rate) {

    function mutate(val) {
      if (Math.random() < rate) {
        return val + randomGaussian(0, 0.1);
      } else {
        return val;
      }
    }
    this.weight_input_hidden.map(mutate);
    this.weight_hidden_output.map(mutate);
    this.bias_hidden.map(mutate);
    this.bias_output.map(mutate);
  }
}
