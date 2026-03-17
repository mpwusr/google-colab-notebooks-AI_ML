const pptxgen = require("pptxgenjs");

// === Color Palette: Forest & Moss (Python-themed) ===
const C = {
  forest: "2C5F2D",
  darkForest: "1A3A1C",
  moss: "97BC62",
  sage: "7DA87B",
  cream: "F5F5F0",
  white: "FFFFFF",
  offWhite: "F7F9F4",
  gray: "6B7B6E",
  darkGray: "3D4F3F",
  accent: "4A90D9",
  accentDark: "2D6BBF",
  orange: "E8913A",
  red: "D94F4F",
  purple: "7B61A8",
  teal: "2E8B8B",
};

const makeShadow = () => ({ type: "outer", blur: 6, offset: 2, angle: 135, color: "000000", opacity: 0.15 });

function addDarkSlide(pres) {
  let s = pres.addSlide();
  s.background = { color: C.darkForest };
  return s;
}
function addLightSlide(pres) {
  let s = pres.addSlide();
  s.background = { color: C.offWhite };
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.moss } });
  return s;
}
function addSlideTitle(slide, title, subtitle) {
  slide.addText(title, {
    x: 0.6, y: 0.25, w: 8.8, h: 0.55,
    fontSize: 28, fontFace: "Trebuchet MS", color: C.forest, bold: true, margin: 0
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.6, y: 0.8, w: 8.8, h: 0.35,
      fontSize: 13, fontFace: "Calibri", color: C.gray, margin: 0
    });
  }
}
function addFooter(slide, pres, moduleNum, slideLabel) {
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.25, w: 10, h: 0.375, fill: { color: C.forest } });
  slide.addText(`Module ${moduleNum}`, {
    x: 0.5, y: 5.25, w: 4, h: 0.375,
    fontSize: 9, fontFace: "Calibri", color: C.moss, valign: "middle", margin: 0
  });
  slide.addText(slideLabel, {
    x: 5.5, y: 5.25, w: 4, h: 0.375,
    fontSize: 9, fontFace: "Calibri", color: C.moss, valign: "middle", align: "right", margin: 0
  });
}
function addCard(slide, pres, x, y, w, h, titleText, bodyLines, accentColor) {
  accentColor = accentColor || C.moss;
  slide.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill: { color: C.white }, shadow: makeShadow() });
  slide.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.06, h, fill: { color: accentColor } });
  slide.addText(titleText, {
    x: x + 0.2, y: y + 0.08, w: w - 0.35, h: 0.35,
    fontSize: 13, fontFace: "Trebuchet MS", color: C.forest, bold: true, margin: 0
  });
  if (bodyLines && bodyLines.length > 0) {
    let textArr = bodyLines.map((line, i) => ({
      text: line,
      options: { bullet: true, breakLine: i < bodyLines.length - 1, fontSize: 11, color: C.darkGray }
    }));
    slide.addText(textArr, {
      x: x + 0.2, y: y + 0.4, w: w - 0.35, h: h - 0.5,
      fontFace: "Calibri", paraSpaceAfter: 4, valign: "top", margin: 0
    });
  }
}
function addTitleSlide(pres, moduleNum, title, subtitle) {
  let s = addDarkSlide(pres);
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.08, fill: { color: C.moss } });
  s.addShape(pres.shapes.OVAL, { x: 7.5, y: 1.5, w: 4, h: 4, fill: { color: C.forest }, line: { color: C.sage, width: 2 } });
  s.addShape(pres.shapes.OVAL, { x: 8.2, y: 2.2, w: 2.6, h: 2.6, fill: { color: C.sage }, line: { color: C.moss, width: 1 } });
  s.addText(`MODULE ${String(moduleNum).padStart(2, "0")}`, {
    x: 0.8, y: 1.2, w: 6, h: 0.4,
    fontSize: 14, fontFace: "Trebuchet MS", color: C.moss, bold: true, charSpacing: 6, margin: 0
  });
  s.addText(title, {
    x: 0.8, y: 1.7, w: 6.5, h: 1.5,
    fontSize: 36, fontFace: "Trebuchet MS", color: C.white, bold: true, margin: 0
  });
  s.addText(subtitle || "Python with AI & Machine Learning", {
    x: 0.8, y: 3.3, w: 6, h: 0.4,
    fontSize: 14, fontFace: "Calibri", color: C.moss, margin: 0
  });
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.25, w: 10, h: 0.375, fill: { color: C.moss } });
  s.addText("Python AI/ML Course", {
    x: 0.5, y: 5.25, w: 9, h: 0.375,
    fontSize: 10, fontFace: "Calibri", color: C.darkForest, valign: "middle", margin: 0
  });
}
function addSummarySlide(pres, moduleNum, keyPoints) {
  let s = addDarkSlide(pres);
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.08, fill: { color: C.moss } });
  s.addText("Summary", {
    x: 0.8, y: 0.5, w: 8, h: 0.6,
    fontSize: 32, fontFace: "Trebuchet MS", color: C.white, bold: true, margin: 0
  });
  let textArr = keyPoints.map((p, i) => ({
    text: p,
    options: { bullet: true, breakLine: i < keyPoints.length - 1, fontSize: 14, color: C.moss }
  }));
  s.addText(textArr, {
    x: 0.8, y: 1.3, w: 8.4, h: 3.5,
    fontFace: "Calibri", paraSpaceAfter: 8, valign: "top", margin: 0
  });
  addFooter(s, pres, moduleNum, "Summary");
}
function addCodeSlide(slide, pres, moduleNum, title, codeLines, label) {
  addSlideTitle(slide, title);
  slide.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 1.1, w: 9.2, h: 3.9, fill: { color: C.darkForest }, shadow: makeShadow() });
  slide.addText(codeLines.map((line, i) => ({
    text: line,
    options: { breakLine: i < codeLines.length - 1, color: line.startsWith("#") ? C.gray : C.moss }
  })), {
    x: 0.6, y: 1.2, w: 8.8, h: 3.7,
    fontSize: 11, fontFace: "Consolas", valign: "top", margin: 0, paraSpaceAfter: 2
  });
  addFooter(slide, pres, moduleNum, label);
}

// =========================================================================
// MODULE DEFINITIONS
// =========================================================================
const modules = [
  {
    num: 1, file: "01-python-fundamentals", title: "Python\nFundamentals",
    slides: [
      { type: "topics", title: "What You Will Learn", items: [
        "Python syntax, variables, and data types",
        "Control flow: if/elif/else, for loops, while loops",
        "Functions: definition, arguments, return values, scope",
        "File I/O: reading and writing files",
        "Error handling with try/except",
        "Debugging techniques and best practices",
      ]},
      { type: "cards2", title: "Variables & Data Types", sub: "Dynamic typing in Python",
        left: { title: "Numeric Types", items: ["int: whole numbers (42, -7, 0)", "float: decimals (3.14, -0.001)", "complex: complex numbers (3+4j)", "bool: True/False (subclass of int)"] },
        right: { title: "Sequence Types", items: ["str: text ('hello', \"world\")", "list: mutable ordered [1, 2, 3]", "tuple: immutable ordered (1, 2, 3)", "range: range(start, stop, step)"] },
      },
      { type: "cards2", title: "Control Flow", sub: "Making decisions and repeating actions",
        left: { title: "Conditionals", items: ["if / elif / else chains", "Ternary: x = a if cond else b", "Match/case (Python 3.10+)", "Truthy/falsy values: 0, '', None, [] are False"] },
        right: { title: "Loops", items: ["for item in iterable:", "while condition:", "break, continue, else on loops", "List comprehensions: [x**2 for x in range(10)]"] },
      },
      { type: "code", title: "Functions", label: "Functions", lines: [
        "# Function definition with type hints",
        "def greet(name: str, greeting: str = 'Hello') -> str:",
        "    return f'{greeting}, {name}!'",
        "",
        "# *args and **kwargs",
        "def flexible(*args, **kwargs):",
        "    print(f'Positional: {args}')",
        "    print(f'Keyword: {kwargs}')",
        "",
        "# Lambda functions",
        "square = lambda x: x ** 2",
        "sorted_names = sorted(names, key=lambda n: n.lower())",
        "",
        "# Decorators",
        "def timer(func):",
        "    def wrapper(*args, **kwargs):",
        "        import time; start = time.time()",
        "        result = func(*args, **kwargs)",
        "        print(f'{func.__name__} took {time.time()-start:.2f}s')",
        "        return result",
        "    return wrapper",
      ]},
      { type: "cards2", title: "File I/O & Error Handling", sub: "Working with files and handling exceptions",
        left: { title: "File Operations", items: ["open('file.txt', 'r') — read mode", "open('file.txt', 'w') — write (overwrite)", "open('file.txt', 'a') — append", "Context manager: with open(...) as f:", "f.read(), f.readline(), f.readlines()"] },
        right: { title: "Error Handling", items: ["try / except / else / finally", "Catch specific: except ValueError as e:", "Raise exceptions: raise TypeError('msg')", "Custom exceptions: class MyError(Exception):", "Debugging: breakpoint(), pdb, print()"] },
      },
    ],
    summary: [
      "Python is dynamically typed — variables don't need type declarations",
      "Control flow: if/elif/else, for loops with iterables, while loops, comprehensions",
      "Functions: def, *args/**kwargs, lambda, decorators for reusable code",
      "File I/O: always use 'with' context managers for safe file handling",
      "Error handling: try/except for graceful failure, raise for custom errors",
    ],
  },
  {
    num: 2, file: "02-data-structures-oop", title: "Data Structures\n& OOP",
    slides: [
      { type: "topics", title: "What You Will Learn", items: [
        "Python built-in data structures: lists, tuples, dicts, sets",
        "Advanced structures: arrays, linked lists, trees",
        "Object-Oriented Programming: classes, objects, methods",
        "Inheritance, polymorphism, encapsulation",
        "Magic methods and operator overloading",
        "Design patterns and best practices",
      ]},
      { type: "cards3", title: "Built-in Data Structures",
        c1: { title: "Lists & Tuples", items: ["list: mutable, ordered, []", "tuple: immutable, ordered, ()", "Slicing: lst[1:5:2]", "Methods: append, extend, sort"], color: C.moss },
        c2: { title: "Dictionaries", items: ["Key-value pairs {k: v}", "O(1) lookup by key", ".get(), .items(), .keys()", "Dict comprehensions"], color: C.accent },
        c3: { title: "Sets", items: ["Unique elements {1,2,3}", "Union, intersection, diff", "O(1) membership test", "frozenset (immutable)"], color: C.orange },
      },
      { type: "code", title: "Object-Oriented Programming", label: "OOP", lines: [
        "class Animal:",
        "    def __init__(self, name: str, species: str):",
        "        self.name = name",
        "        self._species = species  # protected",
        "",
        "    def speak(self) -> str:",
        "        return f'{self.name} makes a sound'",
        "",
        "    def __repr__(self) -> str:",
        "        return f'Animal({self.name!r}, {self._species!r})'",
        "",
        "class Dog(Animal):  # Inheritance",
        "    def __init__(self, name: str, breed: str):",
        "        super().__init__(name, 'Canine')",
        "        self.breed = breed",
        "",
        "    def speak(self) -> str:  # Polymorphism",
        "        return f'{self.name} barks!'",
      ]},
      { type: "cards2", title: "Advanced OOP Concepts", sub: "Beyond the basics",
        left: { title: "Encapsulation", items: ["Public: self.name", "Protected: self._name (convention)", "Private: self.__name (name mangling)", "@property decorator for getters/setters", "Slots: __slots__ for memory optimization"] },
        right: { title: "Special Methods", items: ["__init__: constructor", "__str__ / __repr__: string representation", "__len__, __getitem__: container behavior", "__add__, __eq__: operator overloading", "__enter__, __exit__: context manager"] },
      },
    ],
    summary: [
      "Lists (mutable, ordered), tuples (immutable), dicts (key-value), sets (unique items)",
      "OOP: classes encapsulate data + behavior, __init__ is the constructor",
      "Inheritance: child classes extend parent classes, super() calls parent methods",
      "Polymorphism: same method name, different behavior in subclasses",
      "Magic methods (__str__, __len__, etc.) make custom classes feel Pythonic",
    ],
  },
  {
    num: 3, file: "03-numpy-pandas", title: "Data Science:\nNumPy & Pandas",
    slides: [
      { type: "topics", title: "What You Will Learn", items: [
        "NumPy: arrays, vectorized operations, broadcasting",
        "Pandas: Series, DataFrames, data manipulation",
        "Data loading: CSV, Excel, JSON, SQL",
        "Filtering, grouping, aggregation, merging",
        "Handling missing data and data cleaning",
        "Time series basics with Pandas",
      ]},
      { type: "code", title: "NumPy Essentials", label: "NumPy", lines: [
        "import numpy as np",
        "",
        "# Array creation",
        "arr = np.array([1, 2, 3, 4, 5])",
        "zeros = np.zeros((3, 4))        # 3x4 matrix of zeros",
        "rand = np.random.randn(100, 5)  # 100x5 random normal",
        "",
        "# Vectorized operations (no loops!)",
        "result = arr * 2 + 1            # Element-wise: [3, 5, 7, 9, 11]",
        "dot = np.dot(a, b)              # Matrix multiplication",
        "",
        "# Indexing & slicing",
        "matrix = np.arange(12).reshape(3, 4)",
        "row = matrix[0, :]              # First row",
        "col = matrix[:, 2]              # Third column",
        "mask = matrix[matrix > 5]       # Boolean indexing",
        "",
        "# Statistics",
        "np.mean(arr), np.std(arr), np.median(arr)",
      ]},
      { type: "code", title: "Pandas DataFrame Operations", label: "Pandas", lines: [
        "import pandas as pd",
        "",
        "# Load data",
        "df = pd.read_csv('data.csv')",
        "df.head(), df.info(), df.describe()",
        "",
        "# Selection & filtering",
        "df['column']                         # Single column",
        "df[['col1', 'col2']]                 # Multiple columns",
        "df[df['age'] > 30]                   # Boolean filter",
        "df.query('age > 30 and salary > 50000')",
        "",
        "# GroupBy & Aggregation",
        "df.groupby('department')['salary'].mean()",
        "df.groupby(['dept', 'role']).agg({'salary': ['mean', 'max']})",
        "",
        "# Missing data",
        "df.isnull().sum()                    # Count nulls",
        "df.fillna(0)                         # Fill with value",
        "df.dropna(subset=['important_col'])  # Drop rows",
      ]},
      { type: "cards2", title: "Data Wrangling", sub: "Merge, reshape, and transform data",
        left: { title: "Merging & Joining", items: ["pd.merge(df1, df2, on='key')", "pd.merge(df1, df2, how='left')", "pd.concat([df1, df2], axis=0)", "df.join(other, on='key')"] },
        right: { title: "Reshaping", items: ["df.pivot_table(values, index, columns)", "df.melt(id_vars, value_vars)", "df.stack() / df.unstack()", "pd.get_dummies(df['category'])"] },
      },
    ],
    summary: [
      "NumPy: fast vectorized operations on arrays — avoid Python loops for numerical work",
      "Pandas: DataFrames are the core abstraction for tabular data manipulation",
      "Filtering: boolean indexing, .query(), .loc[], .iloc[] for precise data selection",
      "GroupBy + agg: powerful split-apply-combine pattern for summarizing data",
      "Always inspect data first: .head(), .info(), .describe(), .isnull().sum()",
    ],
  },
  {
    num: 4, file: "04-data-visualization", title: "Data\nVisualization",
    slides: [
      { type: "topics", title: "What You Will Learn", items: [
        "Matplotlib: the foundational plotting library",
        "Seaborn: statistical data visualization",
        "Chart types: line, bar, scatter, histogram, box, heatmap",
        "Customization: colors, labels, legends, annotations",
        "Subplots and multi-panel figures",
        "Best practices for effective data storytelling",
      ]},
      { type: "code", title: "Matplotlib Basics", label: "Matplotlib", lines: [
        "import matplotlib.pyplot as plt",
        "",
        "# Basic line plot",
        "fig, ax = plt.subplots(figsize=(10, 6))",
        "ax.plot(x, y, color='#2C5F2D', linewidth=2, label='Revenue')",
        "ax.set_title('Monthly Revenue', fontsize=16)",
        "ax.set_xlabel('Month'); ax.set_ylabel('Revenue ($)')",
        "ax.legend(); ax.grid(alpha=0.3)",
        "plt.tight_layout(); plt.show()",
        "",
        "# Subplots",
        "fig, axes = plt.subplots(2, 2, figsize=(12, 8))",
        "axes[0,0].bar(categories, values)",
        "axes[0,1].scatter(x, y, c=colors, s=sizes, alpha=0.6)",
        "axes[1,0].hist(data, bins=30, edgecolor='white')",
        "axes[1,1].boxplot([group1, group2, group3])",
      ]},
      { type: "code", title: "Seaborn Statistical Plots", label: "Seaborn", lines: [
        "import seaborn as sns",
        "",
        "# Distribution plots",
        "sns.histplot(df['salary'], kde=True, bins=30)",
        "sns.kdeplot(data=df, x='age', hue='department')",
        "",
        "# Categorical plots",
        "sns.boxplot(data=df, x='department', y='salary')",
        "sns.violinplot(data=df, x='dept', y='salary', hue='gender')",
        "sns.countplot(data=df, x='category', order=top_5)",
        "",
        "# Relationships",
        "sns.scatterplot(data=df, x='age', y='salary', hue='dept', size='experience')",
        "sns.regplot(data=df, x='hours', y='score', ci=95)",
        "",
        "# Heatmap (correlation matrix)",
        "sns.heatmap(df.corr(), annot=True, cmap='coolwarm', center=0)",
      ]},
      { type: "cards2", title: "Best Practices", sub: "Effective data storytelling",
        left: { title: "Do", items: ["Choose the right chart for your data", "Label axes and include units", "Use color intentionally (highlight key data)", "Simplify: remove chart junk, reduce clutter", "Tell a story: title should state the insight"] },
        right: { title: "Avoid", items: ["3D charts (distort perception)", "Pie charts for > 5 categories", "Truncated y-axes (misleading)", "Too many colors or overlapping data", "Missing context (no title, no labels)"] },
      },
    ],
    summary: [
      "Matplotlib: low-level control, fig/ax pattern for publication-quality plots",
      "Seaborn: high-level statistical plots built on Matplotlib, great defaults",
      "Chart selection: scatter (relationships), bar (comparison), hist (distribution), heatmap (correlation)",
      "Always label axes, add titles, and use tight_layout() for clean output",
      "Data storytelling: lead with the insight, use color to draw attention",
    ],
  },
  {
    num: 5, file: "05-eda", title: "Exploratory\nData Analysis",
    slides: [
      { type: "topics", title: "What You Will Learn", items: [
        "The EDA process: understand, clean, analyze, visualize",
        "Statistical summaries and distributions",
        "Identifying and handling outliers",
        "Feature engineering and transformation",
        "Correlation analysis and multicollinearity",
        "Real-world EDA: Titanic dataset walkthrough",
      ]},
      { type: "cards2", title: "The EDA Process", sub: "Systematic approach to understanding data",
        left: { title: "Phase 1: Understand", items: ["df.shape, df.dtypes, df.info()", "df.describe() for statistics", "df.nunique() for cardinality", "df.isnull().sum() for missing data", "df.duplicated().sum() for duplicates"] },
        right: { title: "Phase 2: Clean & Transform", items: ["Handle missing values (impute or drop)", "Remove or cap outliers (IQR method)", "Encode categoricals (label, one-hot)", "Feature scaling (StandardScaler, MinMax)", "Create new features from existing ones"] },
      },
      { type: "code", title: "EDA in Practice", label: "EDA Code", lines: [
        "import pandas as pd, seaborn as sns, matplotlib.pyplot as plt",
        "",
        "# Load and inspect",
        "df = pd.read_csv('titanic.csv')",
        "print(df.shape, df.dtypes)",
        "print(df.describe())",
        "print(df.isnull().sum())",
        "",
        "# Distribution of target",
        "sns.countplot(data=df, x='Survived', hue='Pclass')",
        "",
        "# Outlier detection (IQR method)",
        "Q1, Q3 = df['Fare'].quantile([0.25, 0.75])",
        "IQR = Q3 - Q1",
        "outliers = df[(df['Fare'] < Q1-1.5*IQR) | (df['Fare'] > Q3+1.5*IQR)]",
        "",
        "# Correlation heatmap",
        "sns.heatmap(df.select_dtypes('number').corr(), annot=True, cmap='coolwarm')",
        "",
        "# Feature engineering",
        "df['FamilySize'] = df['SibSp'] + df['Parch'] + 1",
        "df['IsAlone'] = (df['FamilySize'] == 1).astype(int)",
      ]},
      { type: "cards2", title: "Feature Engineering", sub: "Creating better inputs for ML models",
        left: { title: "Numerical Features", items: ["Binning: pd.cut(), pd.qcut()", "Log transform for skewed data", "Polynomial features", "Interaction features (A * B)", "Rolling statistics for time series"] },
        right: { title: "Categorical Features", items: ["Label encoding: cat.codes", "One-hot: pd.get_dummies()", "Ordinal encoding for ordered categories", "Target encoding (mean of target per category)", "Frequency encoding"] },
      },
    ],
    summary: [
      "EDA is iterative: understand, clean, visualize, engineer features, repeat",
      "Always start with .shape, .info(), .describe(), .isnull().sum()",
      "Outliers: detect with IQR or z-scores, decide to remove, cap, or keep",
      "Correlation heatmaps reveal multicollinearity and feature-target relationships",
      "Feature engineering often matters more than model selection for performance",
    ],
  },
  {
    num: 6, file: "06-machine-learning", title: "Machine\nLearning",
    slides: [
      { type: "topics", title: "What You Will Learn", items: [
        "Supervised learning: regression and classification",
        "Linear regression, logistic regression, decision trees",
        "Model evaluation: MSE, RMSE, R-squared, accuracy, precision, recall, F1",
        "Train/test split and cross-validation",
        "Hyperparameter tuning: GridSearchCV, RandomizedSearchCV",
        "Handling imbalanced datasets: oversampling, undersampling",
      ]},
      { type: "cards3", title: "ML Workflow",
        c1: { title: "1. Prepare", items: ["Split: train_test_split()", "Scale features", "Encode categoricals", "Handle class imbalance"], color: C.moss },
        c2: { title: "2. Train", items: ["Choose algorithm", "Fit on training data", "Tune hyperparameters", "Cross-validate"], color: C.accent },
        c3: { title: "3. Evaluate", items: ["Predict on test set", "Metrics: accuracy, F1, R2", "Confusion matrix", "Learning curves"], color: C.orange },
      },
      { type: "code", title: "Scikit-Learn Pipeline", label: "sklearn", lines: [
        "from sklearn.model_selection import train_test_split, cross_val_score",
        "from sklearn.preprocessing import StandardScaler",
        "from sklearn.linear_model import LinearRegression, LogisticRegression",
        "from sklearn.tree import DecisionTreeClassifier",
        "from sklearn.metrics import accuracy_score, classification_report",
        "",
        "# Split data",
        "X_train, X_test, y_train, y_test = train_test_split(",
        "    X, y, test_size=0.2, random_state=42, stratify=y)",
        "",
        "# Scale features",
        "scaler = StandardScaler()",
        "X_train_scaled = scaler.fit_transform(X_train)",
        "X_test_scaled = scaler.transform(X_test)  # Never fit on test!",
        "",
        "# Train & evaluate",
        "model = LogisticRegression(max_iter=1000)",
        "model.fit(X_train_scaled, y_train)",
        "y_pred = model.predict(X_test_scaled)",
        "print(classification_report(y_test, y_pred))",
      ]},
      { type: "code", title: "Hyperparameter Tuning", label: "Tuning", lines: [
        "from sklearn.model_selection import GridSearchCV, RandomizedSearchCV",
        "from sklearn.tree import DecisionTreeClassifier",
        "",
        "# Grid Search (exhaustive)",
        "param_grid = {",
        "    'max_depth': [3, 5, 10, None],",
        "    'min_samples_split': [2, 5, 10],",
        "    'min_samples_leaf': [1, 2, 4],",
        "}",
        "grid = GridSearchCV(DecisionTreeClassifier(), param_grid,",
        "                    cv=5, scoring='f1', n_jobs=-1)",
        "grid.fit(X_train, y_train)",
        "print(f'Best params: {grid.best_params_}')",
        "print(f'Best F1: {grid.best_score_:.4f}')",
        "",
        "# K-Fold Cross Validation",
        "scores = cross_val_score(model, X, y, cv=5, scoring='accuracy')",
        "print(f'CV Accuracy: {scores.mean():.4f} +/- {scores.std():.4f}')",
      ]},
      { type: "cards2", title: "Evaluation Metrics", sub: "Choosing the right metric",
        left: { title: "Regression", items: ["MSE: Mean Squared Error", "RMSE: Root MSE (same units as target)", "MAE: Mean Absolute Error", "R-squared: proportion of variance explained"] },
        right: { title: "Classification", items: ["Accuracy: correct / total (beware imbalance!)", "Precision: TP / (TP + FP) — when FP is costly", "Recall: TP / (TP + FN) — when FN is costly", "F1 Score: harmonic mean of precision & recall"] },
      },
    ],
    summary: [
      "ML workflow: prepare data, train model, evaluate, tune, iterate",
      "Always split data BEFORE any preprocessing (prevent data leakage)",
      "Cross-validation gives more reliable estimates than a single train/test split",
      "GridSearchCV for small parameter spaces, RandomizedSearchCV for large ones",
      "Choose metrics that match your business goal (precision vs recall tradeoff)",
    ],
  },
  {
    num: 7, file: "07-advanced-ml", title: "Advanced\nMachine Learning",
    slides: [
      { type: "topics", title: "What You Will Learn", items: [
        "Ensemble methods: bagging, boosting, stacking",
        "Random Forest, Gradient Boosting, XGBoost, LightGBM",
        "Unsupervised learning: K-Means, hierarchical clustering",
        "Dimensionality reduction: PCA",
        "End-to-end ML projects and case studies",
        "Model deployment considerations",
      ]},
      { type: "cards2", title: "Ensemble Methods", sub: "Combining models for better performance",
        left: { title: "Bagging (Bootstrap Aggregating)", items: ["Train multiple models on random subsets", "Average predictions (reduce variance)", "Random Forest: bagging + feature randomness", "Handles overfitting well", "Parallelizable — fast training"] },
        right: { title: "Boosting (Sequential)", items: ["Train models sequentially on errors", "Each model corrects the previous one", "Gradient Boosting, XGBoost, LightGBM", "Reduces bias AND variance", "Risk of overfitting without tuning"] },
      },
      { type: "code", title: "Ensemble Models in Practice", label: "Ensembles", lines: [
        "from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier",
        "from sklearn.ensemble import VotingClassifier, StackingClassifier",
        "",
        "# Random Forest",
        "rf = RandomForestClassifier(n_estimators=200, max_depth=10,",
        "                            random_state=42, n_jobs=-1)",
        "rf.fit(X_train, y_train)",
        "print(f'Feature importance: {dict(zip(feature_names, rf.feature_importances_))}')",
        "",
        "# Gradient Boosting",
        "gb = GradientBoostingClassifier(n_estimators=200, learning_rate=0.1,",
        "                                 max_depth=5, random_state=42)",
        "",
        "# Voting Ensemble",
        "voting = VotingClassifier(estimators=[",
        "    ('rf', rf), ('gb', gb), ('lr', LogisticRegression())",
        "], voting='soft')",
        "voting.fit(X_train, y_train)",
      ]},
      { type: "cards2", title: "Unsupervised Learning", sub: "Finding structure without labels",
        left: { title: "K-Means Clustering", items: ["Partition data into K clusters", "Elbow method to find optimal K", "Sensitive to initialization (use k-means++)", "Works best with spherical clusters", "KMeans(n_clusters=K).fit(X)"] },
        right: { title: "Dimensionality Reduction", items: ["PCA: find principal components", "Reduce features while keeping variance", "Visualize high-dimensional data in 2D/3D", "Remove multicollinearity", "PCA(n_components=2).fit_transform(X)"] },
      },
    ],
    summary: [
      "Random Forest: robust, handles non-linearity, provides feature importance",
      "Gradient Boosting (XGBoost/LightGBM): top performers on tabular data",
      "Ensemble = combine models for better generalization than any single model",
      "K-Means: simple but effective clustering, use elbow method for K",
      "PCA: reduce dimensions, speed up training, remove noise",
    ],
  },
  {
    num: 8, file: "08-neural-networks", title: "Neural\nNetworks",
    slides: [
      { type: "topics", title: "What You Will Learn", items: [
        "Biological inspiration: neurons, layers, activation",
        "Perceptrons and multi-layer networks",
        "Activation functions: ReLU, sigmoid, softmax",
        "Backpropagation and gradient descent",
        "Building neural networks with Keras/TensorFlow",
        "Overfitting: dropout, regularization, early stopping",
      ]},
      { type: "cards3", title: "Neural Network Architecture",
        c1: { title: "Input Layer", items: ["One neuron per feature", "Normalized/scaled input", "Shape matches data dims"], color: C.moss },
        c2: { title: "Hidden Layers", items: ["Dense (fully connected)", "ReLU activation (default)", "More layers = deeper network", "Batch normalization"], color: C.accent },
        c3: { title: "Output Layer", items: ["Binary: 1 neuron, sigmoid", "Multi-class: N neurons, softmax", "Regression: 1 neuron, linear"], color: C.orange },
      },
      { type: "code", title: "Keras Sequential Model", label: "Keras", lines: [
        "import tensorflow as tf",
        "from tensorflow.keras import Sequential",
        "from tensorflow.keras.layers import Dense, Dropout, BatchNormalization",
        "",
        "model = Sequential([",
        "    Dense(128, activation='relu', input_shape=(n_features,)),",
        "    BatchNormalization(),",
        "    Dropout(0.3),",
        "    Dense(64, activation='relu'),",
        "    Dropout(0.3),",
        "    Dense(32, activation='relu'),",
        "    Dense(1, activation='sigmoid')  # Binary classification",
        "])",
        "",
        "model.compile(optimizer='adam',",
        "              loss='binary_crossentropy',",
        "              metrics=['accuracy'])",
        "",
        "history = model.fit(X_train, y_train, epochs=50, batch_size=32,",
        "                    validation_split=0.2,",
        "                    callbacks=[tf.keras.callbacks.EarlyStopping(patience=5)])",
      ]},
      { type: "cards2", title: "Preventing Overfitting", sub: "Regularization techniques",
        left: { title: "During Training", items: ["Dropout: randomly deactivate neurons", "Early stopping: stop when val_loss rises", "L1/L2 regularization on weights", "Data augmentation (for images)"] },
        right: { title: "Architecture Choices", items: ["Batch normalization between layers", "Reduce model complexity (fewer neurons/layers)", "Use validation set to monitor generalization", "Learning rate scheduling"] },
      },
    ],
    summary: [
      "Neural networks: layers of neurons with learnable weights and activation functions",
      "ReLU for hidden layers, sigmoid for binary output, softmax for multi-class",
      "Backpropagation: compute gradients, gradient descent updates weights",
      "Keras: Sequential API for simple models, Functional API for complex architectures",
      "Combat overfitting: dropout, early stopping, batch norm, regularization",
    ],
  },
  {
    num: 9, file: "09-computer-vision", title: "Computer Vision\n& CNNs",
    slides: [
      { type: "topics", title: "What You Will Learn", items: [
        "Image data: pixels, channels, resolution",
        "Convolutional Neural Networks (CNNs)",
        "Convolution, pooling, and feature maps",
        "Transfer learning: VGG, ResNet, EfficientNet",
        "Image classification and object detection",
        "YOLO for real-time object detection",
      ]},
      { type: "cards3", title: "CNN Architecture",
        c1: { title: "Convolution Layer", items: ["Filters detect features", "Edges, textures, patterns", "Kernel slides over image", "Learnable filter weights"], color: C.moss },
        c2: { title: "Pooling Layer", items: ["Reduces spatial dimensions", "MaxPooling: keep max value", "Reduces computation", "Provides translation invariance"], color: C.accent },
        c3: { title: "Dense Layer", items: ["Flatten feature maps", "Fully connected classifier", "Softmax output layer", "Dropout for regularization"], color: C.orange },
      },
      { type: "code", title: "CNN with Keras", label: "CNN Code", lines: [
        "from tensorflow.keras import Sequential",
        "from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout",
        "",
        "model = Sequential([",
        "    Conv2D(32, (3,3), activation='relu', input_shape=(224,224,3)),",
        "    MaxPooling2D((2,2)),",
        "    Conv2D(64, (3,3), activation='relu'),",
        "    MaxPooling2D((2,2)),",
        "    Conv2D(128, (3,3), activation='relu'),",
        "    MaxPooling2D((2,2)),",
        "    Flatten(),",
        "    Dense(128, activation='relu'),",
        "    Dropout(0.5),",
        "    Dense(num_classes, activation='softmax')",
        "])",
        "",
        "# Transfer Learning (much better!)",
        "base = tf.keras.applications.ResNet50(weights='imagenet', include_top=False,",
        "                                       input_shape=(224,224,3))",
        "base.trainable = False  # Freeze pretrained weights",
      ]},
      { type: "cards2", title: "Transfer Learning & YOLO", sub: "Standing on the shoulders of giants",
        left: { title: "Transfer Learning", items: ["Use pretrained models (ImageNet)", "Freeze base layers, train top layers", "Fine-tune: unfreeze and train at low LR", "ResNet, EfficientNet, VGG most popular", "Works with small datasets (100s of images)"] },
        right: { title: "YOLO (Object Detection)", items: ["Single-pass detection (real-time)", "Detects objects + bounding boxes", "YOLOv7/v8: state of the art", "Applications: surveillance, autonomous driving", "Train custom models on your data"] },
      },
    ],
    summary: [
      "CNNs: convolution layers extract features, pooling reduces dimensions, dense layers classify",
      "Transfer learning: use pretrained models — dramatically better with small datasets",
      "Image augmentation (flip, rotate, crop) increases effective training data",
      "YOLO: real-time object detection, single forward pass through the network",
      "Always normalize pixel values (0-1) and resize images to consistent dimensions",
    ],
  },
  {
    num: 10, file: "10-nlp", title: "Natural Language\nProcessing",
    slides: [
      { type: "topics", title: "What You Will Learn", items: [
        "Text preprocessing: tokenization, stemming, lemmatization",
        "Feature extraction: Bag of Words, TF-IDF",
        "Sentiment analysis and text classification",
        "Word embeddings: Word2Vec, GloVe",
        "Sequence models: RNN, LSTM",
        "Transformers and Hugging Face basics",
      ]},
      { type: "code", title: "Text Preprocessing Pipeline", label: "Preprocessing", lines: [
        "import nltk, re",
        "from nltk.corpus import stopwords",
        "from nltk.stem import WordNetLemmatizer",
        "from sklearn.feature_extraction.text import TfidfVectorizer",
        "",
        "def preprocess(text):",
        "    text = text.lower()                          # Lowercase",
        "    text = re.sub(r'[^a-z\\s]', '', text)         # Remove non-alpha",
        "    tokens = nltk.word_tokenize(text)             # Tokenize",
        "    stop = set(stopwords.words('english'))",
        "    tokens = [t for t in tokens if t not in stop] # Remove stopwords",
        "    lemmatizer = WordNetLemmatizer()",
        "    tokens = [lemmatizer.lemmatize(t) for t in tokens]",
        "    return ' '.join(tokens)",
        "",
        "# TF-IDF vectorization",
        "tfidf = TfidfVectorizer(max_features=5000, ngram_range=(1,2))",
        "X = tfidf.fit_transform(df['text'].apply(preprocess))",
      ]},
      { type: "cards2", title: "From BoW to Transformers", sub: "Evolution of text representation",
        left: { title: "Traditional NLP", items: ["Bag of Words: word counts as features", "TF-IDF: weighted word importance", "N-grams: capture word sequences", "Good baseline, fast, interpretable", "Loses word order and semantics"] },
        right: { title: "Modern NLP", items: ["Word2Vec/GloVe: dense word embeddings", "LSTM/GRU: capture sequence information", "Transformers: attention mechanism", "BERT, GPT: pretrained language models", "Hugging Face: easy-to-use model hub"] },
      },
      { type: "code", title: "Hugging Face Transformers", label: "Transformers", lines: [
        "from transformers import pipeline",
        "",
        "# Sentiment analysis (zero-shot)",
        "classifier = pipeline('sentiment-analysis')",
        "result = classifier('This movie was absolutely fantastic!')",
        "# [{'label': 'POSITIVE', 'score': 0.9998}]",
        "",
        "# Text classification with fine-tuning",
        "from transformers import AutoTokenizer, AutoModelForSequenceClassification",
        "",
        "tokenizer = AutoTokenizer.from_pretrained('bert-base-uncased')",
        "model = AutoModelForSequenceClassification.from_pretrained(",
        "    'bert-base-uncased', num_labels=2)",
        "",
        "# Zero-shot classification",
        "zs = pipeline('zero-shot-classification')",
        "zs('I need to book a flight', candidate_labels=['travel', 'food', 'tech'])",
      ]},
    ],
    summary: [
      "Text preprocessing: lowercase, remove noise, tokenize, remove stopwords, lemmatize",
      "TF-IDF: solid baseline for text features, captures word importance per document",
      "Word embeddings (Word2Vec, GloVe): dense vectors capturing semantic meaning",
      "Transformers (BERT, GPT): state-of-the-art, use attention instead of sequence processing",
      "Hugging Face: one-line pipelines for sentiment, classification, NER, and more",
    ],
  },
  {
    num: 11, file: "11-practice", title: "Quizzes &\nPractice",
    slides: [
      { type: "topics", title: "What You Will Practice", items: [
        "Python coding challenges (HackerRank-style)",
        "Data manipulation with Pandas",
        "Machine learning model building end-to-end",
        "Algorithm design and optimization",
        "Interview-style coding questions",
        "Weekly quizzes covering all modules",
      ]},
      { type: "cards2", title: "Practice Strategy", sub: "How to get the most from practice",
        left: { title: "Coding Practice", items: ["Solve 2-3 problems daily", "Time yourself (25-45 min per problem)", "Write clean, Pythonic code", "Test edge cases", "Review and optimize after solving"] },
        right: { title: "ML Practice", items: ["Build end-to-end projects", "Use Kaggle competitions for real data", "Compare multiple models on same data", "Focus on EDA before modeling", "Document your approach and findings"] },
      },
      { type: "cards3", title: "Key Topics to Review",
        c1: { title: "Python Core", items: ["List comprehensions", "Dict/set operations", "String manipulation", "Recursion & iteration"], color: C.moss },
        c2: { title: "Data Science", items: ["Pandas GroupBy + agg", "Missing data strategies", "Feature engineering", "Cross-validation"], color: C.accent },
        c3: { title: "ML/DL", items: ["sklearn pipeline", "Metric selection", "Overfitting solutions", "Transfer learning"], color: C.orange },
      },
    ],
    summary: [
      "Consistent daily practice is more effective than marathon sessions",
      "Focus on understanding WHY a solution works, not just memorizing code",
      "Build complete projects: problem definition, EDA, modeling, evaluation, presentation",
      "Review mistakes — they reveal gaps in understanding",
      "Time-box problems to build speed for interviews and competitions",
    ],
  },
  {
    num: 12, file: "12-langchain-llms", title: "LangChain\n& LLMs",
    slides: [
      { type: "topics", title: "What You Will Learn", items: [
        "Large Language Models (LLMs): what they are and how they work",
        "Prompt engineering: templates, few-shot, chain-of-thought",
        "LangChain: chains, agents, tools, memory",
        "In-context learning and retrieval-augmented generation (RAG)",
        "Vector databases: embeddings, similarity search",
        "Building AI-powered applications",
      ]},
      { type: "cards2", title: "LLM Fundamentals", sub: "Understanding large language models",
        left: { title: "How LLMs Work", items: ["Trained on massive text datasets", "Next-token prediction at scale", "Emergent abilities: reasoning, coding, translation", "Temperature: creativity vs determinism", "Context window: how much text they can process"] },
        right: { title: "Prompt Engineering", items: ["System prompts set behavior/role", "Few-shot: provide examples in prompt", "Chain-of-thought: 'think step by step'", "Be specific and structured", "Iterate on prompts like code"] },
      },
      { type: "code", title: "LangChain Basics", label: "LangChain", lines: [
        "from langchain_community.llms import OpenAI",
        "from langchain.prompts import PromptTemplate",
        "from langchain.chains import LLMChain",
        "",
        "# Simple prompt template",
        "template = PromptTemplate(",
        "    input_variables=['topic'],",
        "    template='Explain {topic} in simple terms for a beginner.'",
        ")",
        "",
        "# Create a chain",
        "llm = OpenAI(temperature=0.7)",
        "chain = LLMChain(llm=llm, prompt=template)",
        "result = chain.run('neural networks')",
        "",
        "# Sequential chain (pipe output to next step)",
        "from langchain.chains import SimpleSequentialChain",
        "chain1 = LLMChain(llm=llm, prompt=explain_prompt)",
        "chain2 = LLMChain(llm=llm, prompt=quiz_prompt)",
        "pipeline = SimpleSequentialChain(chains=[chain1, chain2])",
      ]},
      { type: "code", title: "RAG: Retrieval-Augmented Generation", label: "RAG", lines: [
        "from langchain.document_loaders import PyPDFLoader",
        "from langchain.text_splitter import RecursiveCharacterTextSplitter",
        "from langchain.embeddings import OpenAIEmbeddings",
        "from langchain.vectorstores import Chroma",
        "from langchain.chains import RetrievalQA",
        "",
        "# 1. Load documents",
        "loader = PyPDFLoader('research_paper.pdf')",
        "docs = loader.load()",
        "",
        "# 2. Split into chunks",
        "splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)",
        "chunks = splitter.split_documents(docs)",
        "",
        "# 3. Create vector store",
        "embeddings = OpenAIEmbeddings()",
        "vectorstore = Chroma.from_documents(chunks, embeddings)",
        "",
        "# 4. Build QA chain",
        "qa = RetrievalQA.from_chain_type(llm=llm, retriever=vectorstore.as_retriever())",
        "answer = qa.run('What are the key findings of this paper?')",
      ]},
    ],
    summary: [
      "LLMs generate text by predicting the next token — prompt engineering guides their output",
      "LangChain: framework for chaining LLM calls, tools, memory, and retrieval",
      "RAG: ground LLM responses in your own documents to reduce hallucination",
      "Vector databases store embeddings for fast semantic similarity search",
      "Building AI apps: load data, chunk, embed, store, retrieve, generate — the RAG pipeline",
    ],
  },
];

// =========================================================================
// RENDER HELPERS
// =========================================================================
function renderSlide(pres, mod, slideDef) {
  if (slideDef.type === "topics") {
    let s = addLightSlide(pres);
    addSlideTitle(s, slideDef.title);
    let items = slideDef.items.map((t, i) => ({
      text: t, options: { bullet: true, breakLine: i < slideDef.items.length - 1, fontSize: 13, color: C.darkGray }
    }));
    s.addText(items, { x: 0.6, y: 1.2, w: 8.8, h: 3.8, fontFace: "Calibri", paraSpaceAfter: 8, valign: "top", margin: 0 });
    addFooter(s, pres, mod.num, slideDef.title);
  }
  else if (slideDef.type === "cards2") {
    let s = addLightSlide(pres);
    addSlideTitle(s, slideDef.title, slideDef.sub);
    addCard(s, pres, 0.4, 1.1, 4.3, 3.8, slideDef.left.title, slideDef.left.items, slideDef.left.color || C.moss);
    addCard(s, pres, 5.3, 1.1, 4.3, 3.8, slideDef.right.title, slideDef.right.items, slideDef.right.color || C.accent);
    addFooter(s, pres, mod.num, slideDef.title);
  }
  else if (slideDef.type === "cards3") {
    let s = addLightSlide(pres);
    addSlideTitle(s, slideDef.title, slideDef.sub);
    addCard(s, pres, 0.4, 1.1, 2.9, 3.6, slideDef.c1.title, slideDef.c1.items, slideDef.c1.color);
    addCard(s, pres, 3.55, 1.1, 2.9, 3.6, slideDef.c2.title, slideDef.c2.items, slideDef.c2.color);
    addCard(s, pres, 6.7, 1.1, 2.9, 3.6, slideDef.c3.title, slideDef.c3.items, slideDef.c3.color);
    addFooter(s, pres, mod.num, slideDef.title);
  }
  else if (slideDef.type === "code") {
    let s = addLightSlide(pres);
    addCodeSlide(s, pres, mod.num, slideDef.title, slideDef.lines, slideDef.label);
  }
}

// =========================================================================
// MAIN
// =========================================================================
async function main() {
  const outDir = "/Users/michaelwilliams/working/google-colab-notebooks-AI-ML/slides";
  console.log("Generating 12 Python AI/ML slide decks...\n");

  for (const mod of modules) {
    let pres = new pptxgen();
    pres.layout = "LAYOUT_16x9";
    pres.author = "AI/ML Course";
    pres.title = `Module ${mod.num}: ${mod.title.replace("\n", " ")}`;

    addTitleSlide(pres, mod.num, mod.title);
    for (const slideDef of mod.slides) {
      renderSlide(pres, mod, slideDef);
    }
    addSummarySlide(pres, mod.num, mod.summary);

    const outFile = `${outDir}/${mod.file}.pptx`;
    await pres.writeFile({ fileName: outFile });
    console.log(`  -> ${mod.file}.pptx (${mod.slides.length + 2} slides)`);
  }

  console.log("\nAll 12 slide decks generated!");
}

main().catch(err => { console.error(err); process.exit(1); });
