const fs = require('fs');

const curriculum = [
  {month:1,week:1,theme:"Math foundations",days:[
    {d:"Day 1",label:"Mon",topic:"Linear algebra: vectors, matrices, dot products",tag:"math"},
    {d:"Day 2",label:"Tue",topic:"Matrix operations: transpose, inverse, eigenvalues, eigenvectors",tag:"math"},
    {d:"Day 3",label:"Wed",topic:"Statistics: mean, median, mode, variance, std deviation, skewness",tag:"math"},
    {d:"Day 4",label:"Thu",topic:"Probability: Bayes theorem, conditional probability, distributions",tag:"math"},
    {d:"Day 5",label:"Fri",topic:"PROJECT: Exploratory data analysis on a real dataset (Iris / Titanic)",tag:"fri"}
  ]},
  {month:1,week:2,theme:"Calculus + ML intro",days:[
    {d:"Day 6",label:"Mon",topic:"Calculus basics: derivatives, chain rule, gradient",tag:"math"},
    {d:"Day 7",label:"Tue",topic:"Cost functions, loss functions, optimization concepts",tag:"math"},
    {d:"Day 8",label:"Wed",topic:"Intro to ML: supervised, unsupervised, reinforcement — terminology",tag:"study"},
    {d:"Day 9",label:"Thu",topic:"Scikit-learn intro: datasets, fit/predict, train-test split, pipelines",tag:"code"},
    {d:"Day 10",label:"Fri",topic:"PROJECT: Full EDA dashboard — visualize a dataset, find 5 insights",tag:"fri"}
  ]},
  {month:1,week:3,theme:"Supervised learning I",days:[
    {d:"Day 11",label:"Mon",topic:"Linear regression: theory, OLS, gradient descent",tag:"study"},
    {d:"Day 12",label:"Tue",topic:"Linear regression: implement from scratch in NumPy, then Scikit-learn",tag:"code"},
    {d:"Day 13",label:"Wed",topic:"Polynomial regression, Ridge (L2), Lasso (L1), ElasticNet",tag:"study"},
    {d:"Day 14",label:"Thu",topic:"Logistic regression theory: sigmoid, decision boundary, log loss",tag:"study"},
    {d:"Day 15",label:"Fri",topic:"PROJECT: House price prediction (California Housing dataset)",tag:"fri"}
  ]},
  {month:1,week:4,theme:"Decision trees + evaluation",days:[
    {d:"Day 16",label:"Mon",topic:"Logistic regression: implement + accuracy, precision, recall, F1",tag:"code"},
    {d:"Day 17",label:"Tue",topic:"Decision trees: Gini impurity, entropy, information gain, pruning",tag:"study"},
    {d:"Day 18",label:"Wed",topic:"Random forest: bagging, feature importance, OOB score",tag:"study"},
    {d:"Day 19",label:"Thu",topic:"Evaluation metrics: confusion matrix, ROC curve, AUC, cross-validation",tag:"code"},
    {d:"Day 20",label:"Fri",topic:"PROJECT: Titanic survival prediction — full ML pipeline",tag:"fri"}
  ]},
  {month:2,week:5,theme:"SVM, KNN, Naive Bayes",days:[
    {d:"Day 21",label:"Mon",topic:"Support Vector Machine: hyperplane, margin, support vectors",tag:"study"},
    {d:"Day 22",label:"Tue",topic:"SVM kernels: linear, RBF, polynomial — implement + tune C and gamma",tag:"code"},
    {d:"Day 23",label:"Wed",topic:"K-Nearest Neighbors: distance metrics, choosing K, curse of dimensionality",tag:"study"},
    {d:"Day 24",label:"Thu",topic:"Naive Bayes: Gaussian, Multinomial, Bernoulli — text classification use case",tag:"study"},
    {d:"Day 25",label:"Fri",topic:"PROJECT: Email spam classifier using Naive Bayes + TF-IDF",tag:"fri"}
  ]},
  {month:2,week:6,theme:"Ensemble methods",days:[
    {d:"Day 26",label:"Mon",topic:"Ensemble learning: bagging vs boosting, variance vs bias tradeoff",tag:"study"},
    {d:"Day 27",label:"Tue",topic:"Gradient boosting, XGBoost — theory and implementation",tag:"study"},
    {d:"Day 28",label:"Wed",topic:"LightGBM, CatBoost — when to use each, parameter tuning",tag:"code"},
    {d:"Day 29",label:"Thu",topic:"Feature engineering, feature selection: SelectKBest, RFE, SHAP values",tag:"code"},
    {d:"Day 30",label:"Fri",topic:"PROJECT: Customer churn prediction — compare 5 models, pick best",tag:"fri"}
  ]},
  {month:2,week:7,theme:"Unsupervised learning",days:[
    {d:"Day 31",label:"Mon",topic:"K-Means clustering: algorithm, elbow method, silhouette score",tag:"study"},
    {d:"Day 32",label:"Tue",topic:"DBSCAN, hierarchical clustering: dendrogram, linkage methods",tag:"study"},
    {d:"Day 33",label:"Wed",topic:"PCA: dimensionality reduction, explained variance, scree plot",tag:"study"},
    {d:"Day 34",label:"Thu",topic:"t-SNE, UMAP: visualizing high-dimensional data",tag:"code"},
    {d:"Day 35",label:"Fri",topic:"PROJECT: Customer segmentation — cluster users and name each group",tag:"fri"}
  ]},
  {month:2,week:8,theme:"Tuning + imbalanced data",days:[
    {d:"Day 36",label:"Mon",topic:"Cross-validation: k-fold, stratified k-fold, leave-one-out",tag:"study"},
    {d:"Day 37",label:"Tue",topic:"Hyperparameter tuning: Grid Search, Randomized Search, Bayesian Optimization",tag:"code"},
    {d:"Day 38",label:"Wed",topic:"Scikit-learn Pipelines: preprocessing + model in one object",tag:"code"},
    {d:"Day 39",label:"Thu",topic:"Imbalanced datasets: SMOTE, class weights, oversampling, undersampling",tag:"study"},
    {d:"Day 40",label:"Fri",topic:"PROJECT: Credit card fraud detection — handle extreme class imbalance",tag:"fri"}
  ]},
  {month:3,week:9,theme:"Neural networks from scratch",days:[
    {d:"Day 41",label:"Mon",topic:"Perceptron, MLP: neurons, layers, forward pass",tag:"dl"},
    {d:"Day 42",label:"Tue",topic:"Activation functions: ReLU, Sigmoid, Tanh, Leaky ReLU, Softmax",tag:"dl"},
    {d:"Day 43",label:"Wed",topic:"Backpropagation: chain rule, gradients, weight update",tag:"dl"},
    {d:"Day 44",label:"Thu",topic:"Optimizers: SGD, Momentum, Adam, RMSprop, AdaGrad",tag:"dl"},
    {d:"Day 45",label:"Fri",topic:"PROJECT: MNIST digit classifier — build neural net from scratch in NumPy",tag:"fri"}
  ]},
  {month:3,week:10,theme:"PyTorch + Keras",days:[
    {d:"Day 46",label:"Mon",topic:"PyTorch: tensors, autograd, computational graph",tag:"dl"},
    {d:"Day 47",label:"Tue",topic:"PyTorch: build nn.Module, DataLoader, training loop",tag:"code"},
    {d:"Day 48",label:"Wed",topic:"TensorFlow + Keras: Sequential, Functional API, callbacks",tag:"code"},
    {d:"Day 49",label:"Thu",topic:"Regularization: Dropout, Batch Normalization, L1/L2 in deep nets",tag:"dl"},
    {d:"Day 50",label:"Fri",topic:"PROJECT: Binary classification NN — predict heart disease",tag:"fri"}
  ]},
  {month:3,week:11,theme:"Convolutional Neural Networks",days:[
    {d:"Day 51",label:"Mon",topic:"CNN: convolution, filters, feature maps, stride, padding",tag:"dl"},
    {d:"Day 52",label:"Tue",topic:"Pooling layers, flattening, fully connected layers",tag:"dl"},
    {d:"Day 53",label:"Wed",topic:"Famous architectures: AlexNet, VGGNet, ResNet, InceptionNet",tag:"study"},
    {d:"Day 54",label:"Thu",topic:"Transfer learning: freeze layers, fine-tuning pretrained models",tag:"code"},
    {d:"Day 55",label:"Fri",topic:"PROJECT: Cats vs dogs image classifier using ResNet transfer learning",tag:"fri"}
  ]},
  {month:3,week:12,theme:"Recurrent Neural Networks",days:[
    {d:"Day 56",label:"Mon",topic:"RNN: sequence models, hidden state, vanishing gradient problem",tag:"dl"},
    {d:"Day 57",label:"Tue",topic:"LSTM: cell state, forget gate, input gate, output gate",tag:"dl"},
    {d:"Day 58",label:"Wed",topic:"GRU: simplified LSTM, when to use GRU vs LSTM",tag:"dl"},
    {d:"Day 59",label:"Thu",topic:"Time series forecasting with LSTM: sliding window, sequence-to-sequence",tag:"code"},
    {d:"Day 60",label:"Fri",topic:"PROJECT: Stock price direction prediction with LSTM",tag:"fri"}
  ]},
  {month:4,week:13,theme:"NLP basics",days:[
    {d:"Day 61",label:"Mon",topic:"NLP pipeline: tokenization, stemming, lemmatization, stopwords",tag:"nlp"},
    {d:"Day 62",label:"Tue",topic:"Bag of Words, TF-IDF: vectorization, vocabulary, sparsity",tag:"nlp"},
    {d:"Day 63",label:"Wed",topic:"Word embeddings: Word2Vec (Skip-gram, CBOW), GloVe, FastText",tag:"nlp"},
    {d:"Day 64",label:"Thu",topic:"Sentiment analysis: VADER, TextBlob, training your own classifier",tag:"nlp"},
    {d:"Day 65",label:"Fri",topic:"PROJECT: Movie review sentiment analyzer — end-to-end NLP pipeline",tag:"fri"}
  ]},
  {month:4,week:14,theme:"Transformers + BERT",days:[
    {d:"Day 66",label:"Mon",topic:"Attention mechanism: query, key, value, self-attention",tag:"nlp"},
    {d:"Day 67",label:"Tue",topic:"Transformer architecture: encoder, decoder, positional encoding, multi-head attention",tag:"nlp"},
    {d:"Day 68",label:"Wed",topic:"BERT: bidirectional, pre-training (MLM + NSP), fine-tuning",tag:"nlp"},
    {d:"Day 69",label:"Thu",topic:"Hugging Face library: pipeline, AutoModel, AutoTokenizer, datasets",tag:"code"},
    {d:"Day 70",label:"Fri",topic:"PROJECT: Multi-class text classifier using BERT fine-tuning",tag:"fri"}
  ]},
  {month:4,week:15,theme:"Computer vision advanced",days:[
    {d:"Day 71",label:"Mon",topic:"Object detection: YOLO architecture, bounding boxes, IoU, NMS",tag:"dl"},
    {d:"Day 72",label:"Tue",topic:"Image segmentation: semantic vs instance, U-Net, Mask R-CNN",tag:"dl"},
    {d:"Day 73",label:"Wed",topic:"OpenCV: image processing, edge detection, morphological operations",tag:"code"},
    {d:"Day 74",label:"Thu",topic:"Face detection/recognition: Haar cascades, dlib, DeepFace",tag:"code"},
    {d:"Day 75",label:"Fri",topic:"PROJECT: Real-time object detector with YOLOv8 on webcam feed",tag:"fri"}
  ]},
  {month:4,week:16,theme:"Generative models",days:[
    {d:"Day 76",label:"Mon",topic:"GAN theory: generator, discriminator, minimax game, mode collapse",tag:"dl"},
    {d:"Day 77",label:"Tue",topic:"DCGAN: deep convolutional GAN implementation in PyTorch",tag:"code"},
    {d:"Day 78",label:"Wed",topic:"Variational Autoencoder (VAE): encoder, latent space, KL divergence",tag:"dl"},
    {d:"Day 79",label:"Thu",topic:"Neural style transfer: content loss, style loss, Gram matrix",tag:"code"},
    {d:"Day 80",label:"Fri",topic:"PROJECT: GAN that generates handwritten digits or anime faces",tag:"fri"}
  ]},
  {month:5,week:17,theme:"Reinforcement learning",days:[
    {d:"Day 81",label:"Mon",topic:"RL fundamentals: agent, environment, state, action, reward, policy",tag:"study"},
    {d:"Day 82",label:"Tue",topic:"Markov Decision Process: Bellman equation, value function, Q-function",tag:"study"},
    {d:"Day 83",label:"Wed",topic:"Q-learning: tabular Q-table, epsilon-greedy, temporal difference",tag:"code"},
    {d:"Day 84",label:"Thu",topic:"Deep Q-Network (DQN): experience replay, target network, policy gradient",tag:"dl"},
    {d:"Day 85",label:"Fri",topic:"PROJECT: Train an AI to play CartPole or LunarLander using DQN",tag:"fri"}
  ]},
  {month:5,week:18,theme:"MLOps + deployment",days:[
    {d:"Day 86",label:"Mon",topic:"MLflow: experiment tracking, logging metrics, model registry",tag:"code"},
    {d:"Day 87",label:"Tue",topic:"Deploy with FastAPI: serve a model as a REST API with /predict endpoint",tag:"code"},
    {d:"Day 88",label:"Wed",topic:"Docker for ML: Dockerfile, containerize your model, docker-compose",tag:"code"},
    {d:"Day 89",label:"Thu",topic:"CI/CD for ML: GitHub Actions, automated retraining, model versioning",tag:"code"},
    {d:"Day 90",label:"Fri",topic:"PROJECT: Deploy your fraud detection model as a live API on Render/Railway",tag:"fri"}
  ]},
  {month:5,week:19,theme:"Large language models",days:[
    {d:"Day 91",label:"Mon",topic:"LLM overview: GPT architecture, scaling laws, emergent abilities",tag:"nlp"},
    {d:"Day 92",label:"Tue",topic:"Prompt engineering: zero-shot, few-shot, chain-of-thought, ReAct",tag:"nlp"},
    {d:"Day 93",label:"Wed",topic:"Fine-tuning LLMs: LoRA, QLoRA, PEFT, instruction tuning",tag:"nlp"},
    {d:"Day 94",label:"Thu",topic:"RAG: retrieval augmented generation, vector databases (FAISS, ChromaDB)",tag:"nlp"},
    {d:"Day 95",label:"Fri",topic:"PROJECT: Build a document Q&A chatbot using RAG + LangChain",tag:"fri"}
  ]},
  {month:5,week:20,theme:"Advanced topics",days:[
    {d:"Day 96",label:"Mon",topic:"Graph Neural Networks: node classification, GCN, message passing",tag:"study"},
    {d:"Day 97",label:"Tue",topic:"Anomaly detection: isolation forest, autoencoders, one-class SVM",tag:"study"},
    {d:"Day 98",label:"Wed",topic:"Recommendation systems: collaborative filtering, matrix factorization, NCF",tag:"study"},
    {d:"Day 99",label:"Thu",topic:"AutoML: TPOT, Auto-sklearn, optuna, neural architecture search",tag:"code"},
    {d:"Day 100",label:"Fri",topic:"PROJECT: Movie recommendation system using collaborative filtering",tag:"fri"}
  ]},
  {month:6,week:21,theme:"Portfolio + Kaggle",days:[
    {d:"Day 101",label:"Mon",topic:"Join your first Kaggle competition — read notebooks, understand leaderboard",tag:"code"},
    {d:"Day 102",label:"Tue",topic:"Kaggle: EDA + baseline model submission",tag:"code"},
    {d:"Day 103",label:"Wed",topic:"Kaggle: feature engineering, ensemble stacking, score improvement",tag:"code"},
    {d:"Day 104",label:"Thu",topic:"Kaggle: write up your approach, publish a notebook",tag:"code"},
    {d:"Day 105",label:"Fri",topic:"PROJECT: Full end-to-end ML project — from raw data to deployed app",tag:"fri"}
  ]},
  {month:6,week:22,theme:"System design for ML",days:[
    {d:"Day 106",label:"Mon",topic:"ML system design: data pipeline, feature store, model serving, monitoring",tag:"study"},
    {d:"Day 107",label:"Tue",topic:"Data versioning: DVC, data lineage, reproducible experiments",tag:"code"},
    {d:"Day 108",label:"Wed",topic:"Model monitoring: data drift, concept drift, retraining triggers",tag:"study"},
    {d:"Day 109",label:"Thu",topic:"Responsible AI: bias, fairness, explainability (LIME, SHAP)",tag:"study"},
    {d:"Day 110",label:"Fri",topic:"PROJECT: Build a real-time ML pipeline with streaming data",tag:"fri"}
  ]},
  {month:6,week:23,theme:"Interview prep",days:[
    {d:"Day 111",label:"Mon",topic:"ML interview questions: explain every algorithm you know (ELI5 style)",tag:"study"},
    {d:"Day 112",label:"Tue",topic:"Coding interview: implement linear regression, k-means, decision tree from scratch",tag:"code"},
    {d:"Day 113",label:"Wed",topic:"Case study interviews: approach, data thinking, business framing",tag:"study"},
    {d:"Day 114",label:"Thu",topic:"Review your GitHub portfolio — clean up READMEs, add live demos",tag:"code"},
    {d:"Day 115",label:"Fri",topic:"PROJECT: Capstone — build and present your best project",tag:"fri"}
  ]},
  {month:6,week:24,theme:"Growth + community",days:[
    {d:"Day 116",label:"Mon",topic:"Write a technical blog post about one project (Medium, Dev.to, Hashnode)",tag:"study"},
    {d:"Day 117",label:"Tue",topic:"Contribute to an open source ML repo on GitHub (even a small fix)",tag:"code"},
    {d:"Day 118",label:"Wed",topic:"Read 3 research papers: choose from NeurIPS, ICML, ICLR",tag:"study"},
    {d:"Day 119",label:"Thu",topic:"Plan month 7: specialize (CV, NLP, RL, MLOps, LLMs, data engineering)",tag:"study"},
    {d:"Day 120",label:"Fri",topic:"PROJECT: Publish your final portfolio — LinkedIn, GitHub, resume update",tag:"fri"}
  ]}
];

const categoryMap = {
  'math': 'Math Foundations',
  'study': 'Machine Learning',
  'code': 'Tools & Practice',
  'dl': 'Deep Learning',
  'nlp': 'NLP',
  'fri': 'Projects'
};

const categories = {};
Object.values(categoryMap).forEach(cat => {
  categories[cat] = [];
});

let idCounter = 1;

curriculum.forEach(w => {
  w.days.forEach(d => {
    let cat = categoryMap[d.tag];
    let topicText = d.topic;
    
    if (d.tag === 'fri') {
      topicText = topicText.replace('PROJECT: ', '');
      categories[cat].push({
        id: `topic_${idCounter++}`,
        title: topicText,
        day: d.d, // ADDED DAY HERE
        completed: false,
        notes: ""
      });
      return;
    }

    // Split logic
    if (topicText.includes(':')) {
      const [main, rest] = topicText.split(':');
      const subtopics = rest.split(',').map(s => s.trim());
      subtopics.forEach(sub => {
        categories[cat].push({
          id: `topic_${idCounter++}`,
          title: `${main}: ${sub}`,
          day: d.d, // ADDED DAY HERE
          completed: false,
          notes: ""
        });
      });
    } else {
      categories[cat].push({
        id: `topic_${idCounter++}`,
        title: topicText,
        day: d.d, // ADDED DAY HERE
        completed: false,
        notes: ""
      });
    }
  });
});

const output = {
  categories: Object.keys(categories).map(k => ({
    name: k,
    topics: categories[k]
  })).filter(c => c.topics.length > 0)
};

fs.writeFileSync('src/data.ts', `export const initialData = ${JSON.stringify(output, null, 2)};`);
console.log("data.ts created successfully.");
