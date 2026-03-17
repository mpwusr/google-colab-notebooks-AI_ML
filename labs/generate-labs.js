const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, LevelFormat, HeadingLevel,
  BorderStyle, WidthType, ShadingType, PageNumber, PageBreak
} = require("docx");

// === Colors ===
const FOREST = "2C5F2D";
const MOSS = "97BC62";
const CREAM = "F7F9F4";
const GRAY = "666666";

function makeNumbering() {
  return {
    config: [
      { reference: "steps", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "Step %1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 720 } }, run: { bold: true, size: 24 } } }] },
      { reference: "bullets", levels: [{ level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
    ]
  };
}
function makeStyles() {
  return {
    default: { document: { run: { font: "Arial", size: 22, color: "333333" } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true, run: { size: 36, bold: true, font: "Arial", color: FOREST }, paragraph: { spacing: { before: 360, after: 200 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true, run: { size: 28, bold: true, font: "Arial", color: FOREST }, paragraph: { spacing: { before: 280, after: 160 }, outlineLevel: 1 } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true, run: { size: 24, bold: true, font: "Arial", color: MOSS }, paragraph: { spacing: { before: 200, after: 120 }, outlineLevel: 2 } },
    ]
  };
}
function pageProps(labTitle, moduleNum) {
  return {
    page: { size: { width: 12240, height: 15840 }, margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } },
    headers: { default: new Header({ children: [new Paragraph({ border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: MOSS, space: 4 } }, children: [new TextRun({ text: `Lab ${moduleNum}: ${labTitle}`, font: "Arial", size: 18, color: GRAY })] })] }) },
    footers: { default: new Footer({ children: [new Paragraph({ border: { top: { style: BorderStyle.SINGLE, size: 4, color: MOSS, space: 4 } }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Python AI/ML Course  |  Page ", font: "Arial", size: 16, color: GRAY }), new TextRun({ children: [PageNumber.CURRENT], font: "Arial", size: 16, color: GRAY })] })] }) },
  };
}

// Helpers
function h1(t) { return new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun(t)] }); }
function h2(t) { return new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun(t)] }); }
function para(t) { return new Paragraph({ spacing: { after: 120 }, children: [new TextRun(t)] }); }
function bullet(t) { return new Paragraph({ numbering: { reference: "bullets", level: 0 }, spacing: { after: 60 }, children: [new TextRun(t)] }); }
function step(t) { return new Paragraph({ numbering: { reference: "steps", level: 0 }, spacing: { before: 200, after: 80 }, children: [new TextRun({ text: t, bold: true, size: 24 })] }); }
function spacer() { return new Paragraph({ spacing: { after: 80 }, children: [] }); }
function pb() { return new Paragraph({ children: [new PageBreak()] }); }

function codeBlock(lines) {
  const border = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
  return new Table({
    width: { size: 9360, type: WidthType.DXA }, columnWidths: [9360],
    rows: lines.map(line => new TableRow({ children: [new TableCell({
      borders: { top: border, bottom: border, left: border, right: border },
      width: { size: 9360, type: WidthType.DXA },
      shading: { fill: "F5F5F5", type: ShadingType.CLEAR },
      margins: { top: 40, bottom: 40, left: 160, right: 160 },
      children: [new Paragraph({ spacing: { after: 0, line: 276 }, children: [new TextRun({ text: line, font: "Consolas", size: 19, color: "2D2D2D" })] })]
    })] }))
  });
}
function expectedOutput(lines) {
  return [
    new Paragraph({ spacing: { before: 80, after: 40 }, children: [new TextRun({ text: "Expected Output:", bold: true, italics: true, size: 20, color: GRAY })] }),
    codeBlock(lines), spacer()
  ];
}
function tipBox(text) {
  const border = { style: BorderStyle.SINGLE, size: 1, color: "10B981" };
  return new Table({ width: { size: 9360, type: WidthType.DXA }, columnWidths: [9360],
    rows: [new TableRow({ children: [new TableCell({
      borders: { top: border, bottom: border, left: { style: BorderStyle.SINGLE, size: 12, color: "10B981" }, right: border },
      width: { size: 9360, type: WidthType.DXA }, shading: { fill: "ECFDF5", type: ShadingType.CLEAR },
      margins: { top: 100, bottom: 100, left: 200, right: 200 },
      children: [new Paragraph({ children: [new TextRun({ text: "Tip: ", bold: true, color: "059669", size: 22 }), new TextRun({ text, size: 22 })] })]
    })] })]
  });
}
function titlePage(labNum, title, objectives) {
  const children = [
    new Paragraph({ spacing: { before: 2000 }, children: [] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 80 }, children: [new TextRun({ text: "PYTHON AI/ML COURSE", font: "Arial", size: 24, color: MOSS, bold: true })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 }, border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: MOSS, space: 12 } }, children: [new TextRun({ text: `Lab ${labNum}`, font: "Arial", size: 52, color: FOREST, bold: true })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 600 }, children: [new TextRun({ text: title, font: "Arial", size: 36, color: FOREST })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 }, children: [new TextRun({ text: "Lab Objectives", font: "Arial", size: 28, bold: true, color: FOREST })] }),
  ];
  objectives.forEach(obj => children.push(new Paragraph({ numbering: { reference: "bullets", level: 0 }, spacing: { after: 60 }, indent: { left: 2160 }, children: [new TextRun({ text: obj, size: 22 })] })));
  children.push(new Paragraph({ spacing: { before: 800 }, children: [] }));
  children.push(new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Prerequisites: ", bold: true, size: 22, color: GRAY }), new TextRun({ text: "Python 3.10+ installed with pip. Google Colab account (optional).", size: 22, color: GRAY })] }));
  children.push(pb());
  return children;
}

// =========================================================================
// LAB CONTENT
// =========================================================================
function lab01() {
  return [
    ...titlePage("01", "Python Fundamentals", ["Write Python scripts with variables, control flow, and functions", "Use list comprehensions and string formatting", "Handle files and exceptions", "Debug code with print statements and breakpoints"]),
    h1("Exercise 1: Variables and Data Types"),
    para("Open a new Python file or Jupyter notebook. Type each code block and observe the output."),
    spacer(),
    step("Explore data types"),
    codeBlock(["# Numeric types", "x = 42          # int", "pi = 3.14159    # float", "is_active = True # bool", "", "print(type(x), type(pi), type(is_active))", "print(f'x={x}, pi={pi:.2f}, active={is_active}')"]),
    ...expectedOutput(["<class 'int'> <class 'float'> <class 'bool'>", "x=42, pi=3.14, active=True"]),
    step("String operations"),
    codeBlock(["name = 'Alice'", "greeting = f'Hello, {name}! You are {len(name)} chars long.'", "print(greeting)", "print(name.upper(), name.lower(), name.replace('A', '@'))", "", "# Slicing", "print(name[0:3])   # Ali", "print(name[::-1])  # ecilA"]),
    ...expectedOutput(["Hello, Alice! You are 5 chars long.", "ALICE alice @lice", "Ali", "ecilA"]),
    step("Type conversion"),
    codeBlock(["age_str = '25'", "age_int = int(age_str)", "price = float('19.99')", "print(age_int + 5)     # 30", "print(str(age_int) + ' years old')"]),
    ...expectedOutput(["30", "25 years old"]),
    tipBox("Use f-strings (f'...{var}...') for string formatting. They are faster and more readable than .format() or % formatting."),
    spacer(), pb(),
    h1("Exercise 2: Control Flow"),
    step("Conditionals"),
    codeBlock(["score = 85", "", "if score >= 90:", "    grade = 'A'", "elif score >= 80:", "    grade = 'B'", "elif score >= 70:", "    grade = 'C'", "else:", "    grade = 'F'", "", "print(f'Score: {score}, Grade: {grade}')", "", "# Ternary", "status = 'pass' if score >= 60 else 'fail'", "print(f'Status: {status}')"]),
    ...expectedOutput(["Score: 85, Grade: B", "Status: pass"]),
    step("Loops and comprehensions"),
    codeBlock(["# For loop", "fruits = ['apple', 'banana', 'cherry']", "for i, fruit in enumerate(fruits):", "    print(f'{i}: {fruit}')", "", "# List comprehension", "squares = [x**2 for x in range(10)]", "print(squares)", "", "# Filtered comprehension", "evens = [x for x in range(20) if x % 2 == 0]", "print(evens)", "", "# Dict comprehension", "word_lengths = {w: len(w) for w in fruits}", "print(word_lengths)"]),
    ...expectedOutput(["0: apple", "1: banana", "2: cherry", "[0, 1, 4, 9, 16, 25, 36, 49, 64, 81]", "[0, 2, 4, 6, 8, 10, 12, 14, 16, 18]", "{'apple': 5, 'banana': 6, 'cherry': 6}"]),
    spacer(), pb(),
    h1("Exercise 3: Functions"),
    step("Define and call functions"),
    codeBlock(["def calculate_bmi(weight_kg, height_m):", "    \"\"\"Calculate Body Mass Index.\"\"\"", "    bmi = weight_kg / (height_m ** 2)", "    if bmi < 18.5:", "        category = 'Underweight'", "    elif bmi < 25:", "        category = 'Normal'", "    elif bmi < 30:", "        category = 'Overweight'", "    else:", "        category = 'Obese'", "    return round(bmi, 1), category", "", "bmi, cat = calculate_bmi(70, 1.75)", "print(f'BMI: {bmi}, Category: {cat}')"]),
    ...expectedOutput(["BMI: 22.9, Category: Normal"]),
    step("Lambda and higher-order functions"),
    codeBlock(["numbers = [3, 1, 4, 1, 5, 9, 2, 6]", "", "# Sort with custom key", "sorted_nums = sorted(numbers, reverse=True)", "print(sorted_nums)", "", "# Map, filter", "doubled = list(map(lambda x: x * 2, numbers))", "big = list(filter(lambda x: x > 4, numbers))", "print(f'Doubled: {doubled}')", "print(f'Big: {big}')"]),
    ...expectedOutput(["[9, 6, 5, 4, 3, 2, 1, 1]", "Doubled: [6, 2, 8, 2, 10, 18, 4, 12]", "Big: [5, 9, 6]"]),
    spacer(), pb(),
    h1("Exercise 4: File I/O and Error Handling"),
    step("Write and read files"),
    codeBlock(["# Write", "with open('sample.txt', 'w') as f:", "    f.write('Line 1: Hello\\n')", "    f.write('Line 2: World\\n')", "", "# Read", "with open('sample.txt', 'r') as f:", "    content = f.read()", "    print(content)", "", "# Read line by line", "with open('sample.txt', 'r') as f:", "    for line in f:", "        print(line.strip())"]),
    ...expectedOutput(["Line 1: Hello", "Line 2: World"]),
    step("Error handling"),
    codeBlock(["def safe_divide(a, b):", "    try:", "        result = a / b", "    except ZeroDivisionError:", "        print('Error: Cannot divide by zero!')", "        return None", "    except TypeError as e:", "        print(f'Error: {e}')", "        return None", "    else:", "        print(f'{a} / {b} = {result}')", "        return result", "    finally:", "        print('Division attempted.')", "", "safe_divide(10, 3)", "safe_divide(10, 0)", "safe_divide('10', 3)"]),
    ...expectedOutput(["10 / 3 = 3.3333333333333335", "Division attempted.", "Error: Cannot divide by zero!", "Division attempted.", "Error: unsupported operand type(s) for /: 'str' and 'int'", "Division attempted."]),
    tipBox("Always use 'with' statements for file operations. They automatically close the file even if an exception occurs."),
  ];
}

function lab02() {
  return [
    ...titlePage("02", "Data Structures & OOP", ["Master Python lists, dicts, sets, and tuples", "Build classes with inheritance and polymorphism", "Use magic methods to create Pythonic objects", "Implement a linked list and binary search tree"]),
    h1("Exercise 1: Data Structures"),
    step("Lists and list operations"),
    codeBlock(["students = ['Alice', 'Bob', 'Charlie', 'Diana']", "students.append('Eve')", "students.insert(1, 'Zara')", "print(students)", "", "# Slicing", "print(students[1:4])", "print(students[::2])  # Every 2nd", "", "# List methods", "nums = [3, 1, 4, 1, 5, 9]", "nums.sort()", "print(nums)", "print(nums.count(1), nums.index(4))"]),
    ...expectedOutput(["['Alice', 'Zara', 'Bob', 'Charlie', 'Diana', 'Eve']", "['Zara', 'Bob', 'Charlie']", "['Alice', 'Bob', 'Diana']", "[1, 1, 3, 4, 5, 9]", "2 2"]),
    step("Dictionaries"),
    codeBlock(["student = {", "    'name': 'Alice',", "    'age': 22,", "    'grades': {'math': 95, 'science': 88, 'english': 92}", "}", "", "print(student['name'])", "print(student.get('gpa', 'N/A'))  # Safe access with default", "print(student['grades']['math'])", "", "# Iterate", "for key, value in student.items():", "    print(f'{key}: {value}')", "", "# Comprehension", "grade_status = {k: 'A' if v >= 90 else 'B' for k, v in student['grades'].items()}", "print(grade_status)"]),
    ...expectedOutput(["Alice", "N/A", "95", "name: Alice", "age: 22", "grades: {'math': 95, 'science': 88, 'english': 92}", "{'math': 'A', 'science': 'B', 'english': 'A'}"]),
    step("Sets"),
    codeBlock(["a = {1, 2, 3, 4, 5}", "b = {4, 5, 6, 7, 8}", "", "print(f'Union: {a | b}')", "print(f'Intersection: {a & b}')", "print(f'Difference: {a - b}')", "print(f'Symmetric diff: {a ^ b}')", "print(f'3 in a: {3 in a}')  # O(1) lookup"]),
    ...expectedOutput(["Union: {1, 2, 3, 4, 5, 6, 7, 8}", "Intersection: {4, 5}", "Difference: {1, 2, 3}", "Symmetric diff: {1, 2, 3, 6, 7, 8}", "3 in a: True"]),
    spacer(), pb(),
    h1("Exercise 2: Object-Oriented Programming"),
    step("Create a class hierarchy"),
    codeBlock(["class Shape:", "    def __init__(self, color='black'):", "        self.color = color", "", "    def area(self):", "        raise NotImplementedError", "", "    def __repr__(self):", "        return f'{self.__class__.__name__}(color={self.color!r})'", "", "class Circle(Shape):", "    def __init__(self, radius, color='red'):", "        super().__init__(color)", "        self.radius = radius", "", "    def area(self):", "        import math", "        return math.pi * self.radius ** 2", "", "class Rectangle(Shape):", "    def __init__(self, width, height, color='blue'):", "        super().__init__(color)", "        self.width = width", "        self.height = height", "", "    def area(self):", "        return self.width * self.height", "", "shapes = [Circle(5), Rectangle(4, 6), Circle(3, 'green')]", "for s in shapes:", "    print(f'{s} -> area = {s.area():.2f}')"]),
    ...expectedOutput(["Circle(color='red') -> area = 78.54", "Rectangle(color='blue') -> area = 24.00", "Circle(color='green') -> area = 28.27"]),
    step("Properties and encapsulation"),
    codeBlock(["class BankAccount:", "    def __init__(self, owner, balance=0):", "        self.owner = owner", "        self._balance = balance  # Protected", "", "    @property", "    def balance(self):", "        return self._balance", "", "    def deposit(self, amount):", "        if amount <= 0:", "            raise ValueError('Amount must be positive')", "        self._balance += amount", "        return self._balance", "", "    def withdraw(self, amount):", "        if amount > self._balance:", "            raise ValueError('Insufficient funds')", "        self._balance -= amount", "        return self._balance", "", "    def __str__(self):", "        return f'{self.owner}: ${self._balance:.2f}'", "", "acct = BankAccount('Alice', 1000)", "acct.deposit(500)", "acct.withdraw(200)", "print(acct)"]),
    ...expectedOutput(["Alice: $1300.00"]),
    tipBox("Use @property for controlled attribute access instead of direct public attributes. It lets you add validation without changing the API."),
  ];
}

function lab03() {
  return [
    ...titlePage("03", "NumPy & Pandas", ["Create and manipulate NumPy arrays", "Load, filter, and aggregate data with Pandas", "Handle missing data and merge DataFrames", "Perform exploratory analysis on a real dataset"]),
    h1("Exercise 1: NumPy Arrays"),
    step("Create arrays and perform operations"),
    codeBlock(["import numpy as np", "", "# Array creation", "a = np.array([1, 2, 3, 4, 5])", "zeros = np.zeros((3, 3))", "ones = np.ones((2, 4))", "rng = np.arange(0, 20, 2)", "lin = np.linspace(0, 1, 5)", "", "print(f'a: {a}')", "print(f'range: {rng}')", "print(f'linspace: {lin}')"]),
    ...expectedOutput(["a: [1 2 3 4 5]", "range: [ 0  2  4  6  8 10 12 14 16 18]", "linspace: [0.   0.25 0.5  0.75 1.  ]"]),
    step("Array operations (vectorized)"),
    codeBlock(["a = np.array([10, 20, 30, 40, 50])", "b = np.array([1, 2, 3, 4, 5])", "", "print(f'a + b = {a + b}')", "print(f'a * 2 = {a * 2}')", "print(f'Mean: {np.mean(a)}, Std: {np.std(a):.2f}')", "", "# Matrix operations", "m = np.array([[1, 2], [3, 4]])", "print(f'Transpose:\\n{m.T}')", "print(f'Determinant: {np.linalg.det(m):.1f}')"]),
    ...expectedOutput(["a + b = [11 22 33 44 55]", "a * 2 = [ 20  40  60  80 100]", "Mean: 30.0, Std: 14.14", "Transpose:", "[[1 3]", " [2 4]]", "Determinant: -2.0"]),
    step("Boolean indexing and filtering"),
    codeBlock(["data = np.random.randn(100)", "print(f'Mean: {data.mean():.3f}')", "print(f'Values > 1: {data[data > 1].shape[0]}')", "print(f'Values between -1 and 1: {data[(data > -1) & (data < 1)].shape[0]}')"]),
    tipBox("NumPy operations are 10-100x faster than Python loops. Always use vectorized operations instead of iterating over arrays."),
    spacer(), pb(),
    h1("Exercise 2: Pandas DataFrames"),
    step("Create and inspect a DataFrame"),
    codeBlock(["import pandas as pd", "", "df = pd.DataFrame({", "    'name': ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve'],", "    'age': [25, 30, 35, 28, 32],", "    'department': ['Engineering', 'Marketing', 'Engineering', 'Sales', 'Marketing'],", "    'salary': [75000, 65000, 85000, 60000, 70000]", "})", "", "print(df)", "print('\\n', df.info())", "print('\\n', df.describe())"]),
    spacer(),
    step("Filter and select data"),
    codeBlock(["# Filter rows", "engineers = df[df['department'] == 'Engineering']", "high_salary = df[df['salary'] > 70000]", "print(engineers)", "print(high_salary)", "", "# Select columns", "print(df[['name', 'salary']])", "", "# Query syntax", "result = df.query('age > 28 and salary > 65000')", "print(result)"]),
    spacer(),
    step("GroupBy and aggregation"),
    codeBlock(["# Group by department", "dept_stats = df.groupby('department').agg({", "    'salary': ['mean', 'max', 'count'],", "    'age': 'mean'", "}).round(0)", "print(dept_stats)", "", "# Simple groupby", "print(df.groupby('department')['salary'].mean())"]),
    ...expectedOutput(["department", "Engineering    80000.0", "Marketing      67500.0", "Sales          60000.0", "Name: salary, dtype: float64"]),
    step("Handle missing data"),
    codeBlock(["# Add some missing values", "df.loc[1, 'salary'] = None", "df.loc[3, 'age'] = None", "", "print(df.isnull().sum())", "print(df.fillna({'salary': df['salary'].mean(), 'age': df['age'].median()}))"]),
    tipBox("Always check df.isnull().sum() before analysis. Missing data can silently skew your results."),
  ];
}

function lab04() {
  return [
    ...titlePage("04", "Data Visualization", ["Create line, bar, scatter, and histogram plots with Matplotlib", "Build statistical plots with Seaborn", "Customize colors, labels, legends, and layouts", "Create multi-panel figures with subplots"]),
    h1("Exercise 1: Matplotlib Basics"),
    step("Create a simple line plot"),
    codeBlock(["import matplotlib.pyplot as plt", "import numpy as np", "", "x = np.linspace(0, 10, 100)", "y1 = np.sin(x)", "y2 = np.cos(x)", "", "fig, ax = plt.subplots(figsize=(10, 6))", "ax.plot(x, y1, color='#2C5F2D', linewidth=2, label='sin(x)')", "ax.plot(x, y2, color='#4A90D9', linewidth=2, linestyle='--', label='cos(x)')", "ax.set_title('Trigonometric Functions', fontsize=16, fontweight='bold')", "ax.set_xlabel('x'); ax.set_ylabel('y')", "ax.legend(); ax.grid(alpha=0.3)", "plt.tight_layout()", "plt.savefig('trig_plot.png', dpi=150)", "plt.show()"]),
    spacer(),
    step("Bar chart"),
    codeBlock(["categories = ['Python', 'JavaScript', 'Java', 'C++', 'Rust']", "popularity = [31, 25, 18, 12, 8]", "colors = ['#2C5F2D', '#97BC62', '#4A90D9', '#E8913A', '#D94F4F']", "", "fig, ax = plt.subplots(figsize=(10, 6))", "bars = ax.bar(categories, popularity, color=colors, edgecolor='white', linewidth=1.5)", "ax.set_title('Language Popularity 2024', fontsize=16)", "ax.set_ylabel('Popularity (%)')", "ax.bar_label(bars, fmt='%d%%')", "ax.spines[['top', 'right']].set_visible(False)", "plt.tight_layout(); plt.show()"]),
    spacer(),
    step("Subplots"),
    codeBlock(["fig, axes = plt.subplots(2, 2, figsize=(12, 10))", "", "# Line plot", "axes[0,0].plot(x, np.sin(x), 'g-')", "axes[0,0].set_title('Line Plot')", "", "# Scatter plot", "axes[0,1].scatter(np.random.randn(50), np.random.randn(50), c='#4A90D9', alpha=0.6)", "axes[0,1].set_title('Scatter Plot')", "", "# Histogram", "axes[1,0].hist(np.random.randn(1000), bins=30, color='#97BC62', edgecolor='white')", "axes[1,0].set_title('Histogram')", "", "# Box plot", "data = [np.random.randn(100) + i for i in range(4)]", "axes[1,1].boxplot(data, labels=['A', 'B', 'C', 'D'])", "axes[1,1].set_title('Box Plot')", "", "plt.suptitle('Four Plot Types', fontsize=18, fontweight='bold')", "plt.tight_layout(); plt.show()"]),
    tipBox("Always use fig, ax = plt.subplots() instead of plt.plot() directly. The object-oriented API gives you much more control."),
    spacer(), pb(),
    h1("Exercise 2: Seaborn Statistical Plots"),
    step("Distribution and categorical plots"),
    codeBlock(["import seaborn as sns", "import pandas as pd", "", "# Load built-in dataset", "tips = sns.load_dataset('tips')", "", "fig, axes = plt.subplots(1, 3, figsize=(18, 5))", "", "# Distribution", "sns.histplot(data=tips, x='total_bill', kde=True, ax=axes[0], color='#2C5F2D')", "axes[0].set_title('Bill Distribution')", "", "# Box plot by category", "sns.boxplot(data=tips, x='day', y='total_bill', hue='sex', ax=axes[1])", "axes[1].set_title('Bills by Day')", "", "# Scatter with regression", "sns.regplot(data=tips, x='total_bill', y='tip', ax=axes[2], color='#4A90D9')", "axes[2].set_title('Bill vs Tip')", "", "plt.tight_layout(); plt.show()"]),
    spacer(),
    step("Correlation heatmap"),
    codeBlock(["# Correlation matrix", "corr = tips.select_dtypes('number').corr()", "", "plt.figure(figsize=(8, 6))", "sns.heatmap(corr, annot=True, cmap='coolwarm', center=0,", "            fmt='.2f', square=True, linewidths=0.5)", "plt.title('Correlation Matrix', fontsize=14)", "plt.tight_layout(); plt.show()"]),
  ];
}

function lab05() {
  return [
    ...titlePage("05", "Exploratory Data Analysis", ["Perform systematic EDA on a real dataset", "Identify and handle missing values and outliers", "Engineer features from existing data", "Draw insights from statistical analysis and visualization"]),
    h1("Exercise 1: EDA Process"),
    step("Load and inspect the Titanic dataset"),
    codeBlock(["import pandas as pd", "import seaborn as sns", "import matplotlib.pyplot as plt", "", "df = sns.load_dataset('titanic')", "print(f'Shape: {df.shape}')", "print(df.head())", "print(df.info())", "print(df.describe())", "print(f'\\nMissing values:\\n{df.isnull().sum()}')"]),
    spacer(),
    step("Visualize the target variable"),
    codeBlock(["fig, axes = plt.subplots(1, 2, figsize=(12, 5))", "", "sns.countplot(data=df, x='survived', ax=axes[0])", "axes[0].set_title('Survival Count')", "", "sns.countplot(data=df, x='survived', hue='pclass', ax=axes[1])", "axes[1].set_title('Survival by Class')", "", "plt.tight_layout(); plt.show()", "print(f'Survival rate: {df.survived.mean():.2%}')"]),
    ...expectedOutput(["Survival rate: 38.38%"]),
    step("Handle missing values"),
    codeBlock(["# Fill age with median per class", "df['age'] = df.groupby('pclass')['age'].transform(", "    lambda x: x.fillna(x.median()))", "", "# Fill embarked with mode", "df['embarked'] = df['embarked'].fillna(df['embarked'].mode()[0])", "", "# Drop deck (too many missing)", "df = df.drop(columns=['deck'])", "print(df.isnull().sum())"]),
    spacer(), pb(),
    h1("Exercise 2: Feature Engineering"),
    step("Create new features"),
    codeBlock(["# Family size", "df['family_size'] = df['sibsp'] + df['parch'] + 1", "df['is_alone'] = (df['family_size'] == 1).astype(int)", "", "# Title extraction from name", "# (if 'name' column existed with full names)", "", "# Age bins", "df['age_group'] = pd.cut(df['age'], bins=[0, 12, 18, 35, 60, 100],", "                         labels=['Child', 'Teen', 'Young Adult', 'Adult', 'Senior'])", "", "print(df[['survived', 'family_size', 'is_alone', 'age_group']].head(10))"]),
    step("Correlation analysis"),
    codeBlock(["numeric_cols = df.select_dtypes('number')", "corr = numeric_cols.corr()", "", "plt.figure(figsize=(10, 8))", "sns.heatmap(corr, annot=True, cmap='coolwarm', center=0, fmt='.2f')", "plt.title('Feature Correlations')", "plt.tight_layout(); plt.show()", "", "# Strongest correlations with target", "print(corr['survived'].sort_values(ascending=False))"]),
    tipBox("Feature engineering often improves model performance more than choosing a better algorithm. Spend time here."),
  ];
}

function lab06() {
  return [
    ...titlePage("06", "Machine Learning", ["Split data and prevent data leakage", "Train linear regression and decision tree models", "Evaluate models with appropriate metrics", "Tune hyperparameters with GridSearchCV"]),
    h1("Exercise 1: Linear Regression"),
    step("Prepare data and train a model"),
    codeBlock(["import numpy as np", "import pandas as pd", "from sklearn.model_selection import train_test_split", "from sklearn.linear_model import LinearRegression", "from sklearn.metrics import mean_squared_error, r2_score", "", "# Generate sample data", "np.random.seed(42)", "X = np.random.randn(200, 3)", "y = 3*X[:,0] + 2*X[:,1] - X[:,2] + np.random.randn(200)*0.5", "", "# Split", "X_train, X_test, y_train, y_test = train_test_split(", "    X, y, test_size=0.2, random_state=42)", "", "# Train", "model = LinearRegression()", "model.fit(X_train, y_train)", "", "# Evaluate", "y_pred = model.predict(X_test)", "print(f'RMSE: {np.sqrt(mean_squared_error(y_test, y_pred)):.4f}')", "print(f'R2 Score: {r2_score(y_test, y_pred):.4f}')", "print(f'Coefficients: {model.coef_}')"]),
    ...expectedOutput(["RMSE: 0.4821", "R2 Score: 0.9712", "Coefficients: [ 3.02  1.97 -1.01]"]),
    spacer(), pb(),
    h1("Exercise 2: Classification with Decision Trees"),
    step("Train and evaluate a classifier"),
    codeBlock(["from sklearn.tree import DecisionTreeClassifier", "from sklearn.metrics import classification_report, confusion_matrix", "from sklearn.datasets import load_iris", "", "# Load data", "iris = load_iris()", "X, y = iris.data, iris.target", "", "X_train, X_test, y_train, y_test = train_test_split(", "    X, y, test_size=0.2, random_state=42, stratify=y)", "", "# Train", "dt = DecisionTreeClassifier(max_depth=3, random_state=42)", "dt.fit(X_train, y_train)", "", "# Evaluate", "y_pred = dt.predict(X_test)", "print(classification_report(y_test, y_pred, target_names=iris.target_names))", "print(f'Confusion Matrix:\\n{confusion_matrix(y_test, y_pred)}')"]),
    spacer(),
    step("Hyperparameter tuning"),
    codeBlock(["from sklearn.model_selection import GridSearchCV", "", "param_grid = {", "    'max_depth': [2, 3, 5, 10, None],", "    'min_samples_split': [2, 5, 10],", "    'min_samples_leaf': [1, 2, 4]", "}", "", "grid = GridSearchCV(DecisionTreeClassifier(random_state=42),", "                    param_grid, cv=5, scoring='accuracy', n_jobs=-1)", "grid.fit(X_train, y_train)", "", "print(f'Best params: {grid.best_params_}')", "print(f'Best CV accuracy: {grid.best_score_:.4f}')", "print(f'Test accuracy: {grid.score(X_test, y_test):.4f}')"]),
    tipBox("Never tune hyperparameters on the test set. Use cross-validation on the training set, then evaluate once on test."),
  ];
}

function lab07() {
  return [
    ...titlePage("07", "Advanced Machine Learning", ["Build Random Forest and Gradient Boosting models", "Compare ensemble methods on the same dataset", "Perform K-Means clustering", "Use PCA for dimensionality reduction"]),
    h1("Exercise 1: Ensemble Methods"),
    step("Random Forest vs Gradient Boosting"),
    codeBlock(["from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier", "from sklearn.datasets import load_breast_cancer", "from sklearn.model_selection import cross_val_score, train_test_split", "", "# Load data", "data = load_breast_cancer()", "X_train, X_test, y_train, y_test = train_test_split(", "    data.data, data.target, test_size=0.2, random_state=42)", "", "# Random Forest", "rf = RandomForestClassifier(n_estimators=200, max_depth=10, random_state=42)", "rf_scores = cross_val_score(rf, X_train, y_train, cv=5, scoring='accuracy')", "print(f'RF CV: {rf_scores.mean():.4f} +/- {rf_scores.std():.4f}')", "", "# Gradient Boosting", "gb = GradientBoostingClassifier(n_estimators=200, learning_rate=0.1, random_state=42)", "gb_scores = cross_val_score(gb, X_train, y_train, cv=5, scoring='accuracy')", "print(f'GB CV: {gb_scores.mean():.4f} +/- {gb_scores.std():.4f}')"]),
    step("Feature importance"),
    codeBlock(["import matplotlib.pyplot as plt", "import numpy as np", "", "rf.fit(X_train, y_train)", "importances = rf.feature_importances_", "indices = np.argsort(importances)[-10:]  # Top 10", "", "plt.figure(figsize=(10, 6))", "plt.barh(range(10), importances[indices], color='#2C5F2D')", "plt.yticks(range(10), [data.feature_names[i] for i in indices])", "plt.title('Top 10 Feature Importances (Random Forest)')", "plt.xlabel('Importance')", "plt.tight_layout(); plt.show()"]),
    spacer(), pb(),
    h1("Exercise 2: Clustering and PCA"),
    step("K-Means clustering"),
    codeBlock(["from sklearn.cluster import KMeans", "from sklearn.preprocessing import StandardScaler", "", "# Scale features", "scaler = StandardScaler()", "X_scaled = scaler.fit_transform(data.data)", "", "# Elbow method", "inertias = []", "for k in range(1, 11):", "    km = KMeans(n_clusters=k, random_state=42, n_init=10)", "    km.fit(X_scaled)", "    inertias.append(km.inertia_)", "", "plt.plot(range(1, 11), inertias, 'bo-')", "plt.xlabel('K'); plt.ylabel('Inertia')", "plt.title('Elbow Method'); plt.show()"]),
    step("PCA for visualization"),
    codeBlock(["from sklearn.decomposition import PCA", "", "pca = PCA(n_components=2)", "X_pca = pca.fit_transform(X_scaled)", "", "plt.figure(figsize=(10, 7))", "scatter = plt.scatter(X_pca[:, 0], X_pca[:, 1], c=data.target,", "                      cmap='coolwarm', alpha=0.7)", "plt.colorbar(scatter, label='Class')", "plt.xlabel(f'PC1 ({pca.explained_variance_ratio_[0]:.1%} variance)')", "plt.ylabel(f'PC2 ({pca.explained_variance_ratio_[1]:.1%} variance)')", "plt.title('Breast Cancer Dataset - PCA Projection')", "plt.show()", "", "print(f'Explained variance: {pca.explained_variance_ratio_.sum():.1%}')"]),
    tipBox("PCA is great for visualization and removing multicollinearity, but always scale your data first with StandardScaler."),
  ];
}

function lab08() {
  return [
    ...titlePage("08", "Neural Networks", ["Build a neural network with Keras Sequential API", "Train on a real dataset and monitor performance", "Implement dropout and early stopping", "Visualize training history"]),
    h1("Exercise 1: Build a Neural Network"),
    step("Prepare data"),
    codeBlock(["import numpy as np", "import tensorflow as tf", "from tensorflow.keras import Sequential", "from tensorflow.keras.layers import Dense, Dropout, BatchNormalization", "from sklearn.model_selection import train_test_split", "from sklearn.preprocessing import StandardScaler", "from sklearn.datasets import load_breast_cancer", "", "# Load and split", "data = load_breast_cancer()", "X_train, X_test, y_train, y_test = train_test_split(", "    data.data, data.target, test_size=0.2, random_state=42)", "", "# Scale", "scaler = StandardScaler()", "X_train = scaler.fit_transform(X_train)", "X_test = scaler.transform(X_test)  # Never fit on test!", "", "print(f'Train: {X_train.shape}, Test: {X_test.shape}')"]),
    ...expectedOutput(["Train: (455, 30), Test: (114, 30)"]),
    step("Build and compile the model"),
    codeBlock(["model = Sequential([", "    Dense(64, activation='relu', input_shape=(30,)),", "    BatchNormalization(),", "    Dropout(0.3),", "    Dense(32, activation='relu'),", "    Dropout(0.3),", "    Dense(16, activation='relu'),", "    Dense(1, activation='sigmoid')  # Binary classification", "])", "", "model.compile(", "    optimizer='adam',", "    loss='binary_crossentropy',", "    metrics=['accuracy']", ")", "", "model.summary()"]),
    step("Train with early stopping"),
    codeBlock(["from tensorflow.keras.callbacks import EarlyStopping", "", "early_stop = EarlyStopping(", "    monitor='val_loss', patience=10, restore_best_weights=True)", "", "history = model.fit(", "    X_train, y_train,", "    epochs=100,", "    batch_size=32,", "    validation_split=0.2,", "    callbacks=[early_stop],", "    verbose=1", ")", "", "# Evaluate", "loss, accuracy = model.evaluate(X_test, y_test)", "print(f'Test Loss: {loss:.4f}, Test Accuracy: {accuracy:.4f}')"]),
    step("Plot training history"),
    codeBlock(["import matplotlib.pyplot as plt", "", "fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(14, 5))", "", "ax1.plot(history.history['loss'], label='Train')", "ax1.plot(history.history['val_loss'], label='Validation')", "ax1.set_title('Loss'); ax1.legend()", "", "ax2.plot(history.history['accuracy'], label='Train')", "ax2.plot(history.history['val_accuracy'], label='Validation')", "ax2.set_title('Accuracy'); ax2.legend()", "", "plt.tight_layout(); plt.show()"]),
    tipBox("If training accuracy is high but validation accuracy is low, your model is overfitting. Add more dropout or reduce model size."),
  ];
}

function lab09() {
  return [
    ...titlePage("09", "Computer Vision & CNNs", ["Build a CNN for image classification", "Use data augmentation to improve generalization", "Apply transfer learning with a pretrained model", "Evaluate with confusion matrix"]),
    h1("Exercise 1: CNN from Scratch"),
    step("Load and preprocess image data"),
    codeBlock(["import tensorflow as tf", "from tensorflow.keras.datasets import cifar10", "import numpy as np", "", "# Load CIFAR-10", "(X_train, y_train), (X_test, y_test) = cifar10.load_data()", "", "# Normalize pixels to [0, 1]", "X_train = X_train.astype('float32') / 255.0", "X_test = X_test.astype('float32') / 255.0", "", "class_names = ['airplane', 'automobile', 'bird', 'cat', 'deer',", "               'dog', 'frog', 'horse', 'ship', 'truck']", "", "print(f'Train: {X_train.shape}, Test: {X_test.shape}')", "print(f'Classes: {len(class_names)}')"]),
    ...expectedOutput(["Train: (50000, 32, 32, 3), Test: (10000, 32, 32, 3)", "Classes: 10"]),
    step("Build a CNN model"),
    codeBlock(["from tensorflow.keras import Sequential", "from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout", "", "model = Sequential([", "    Conv2D(32, (3,3), activation='relu', input_shape=(32,32,3)),", "    MaxPooling2D((2,2)),", "    Conv2D(64, (3,3), activation='relu'),", "    MaxPooling2D((2,2)),", "    Conv2D(64, (3,3), activation='relu'),", "    Flatten(),", "    Dense(64, activation='relu'),", "    Dropout(0.5),", "    Dense(10, activation='softmax')", "])", "", "model.compile(optimizer='adam',", "              loss='sparse_categorical_crossentropy',", "              metrics=['accuracy'])", "model.summary()"]),
    step("Train and evaluate"),
    codeBlock(["history = model.fit(X_train, y_train, epochs=15, batch_size=64,", "                    validation_split=0.1)", "", "test_loss, test_acc = model.evaluate(X_test, y_test)", "print(f'Test Accuracy: {test_acc:.4f}')"]),
    spacer(), pb(),
    h1("Exercise 2: Transfer Learning"),
    step("Use a pretrained model"),
    codeBlock(["from tensorflow.keras.applications import MobileNetV2", "from tensorflow.keras import Model", "from tensorflow.keras.layers import GlobalAveragePooling2D, Dense", "", "# Load pretrained base (without top classifier)", "base_model = MobileNetV2(weights='imagenet', include_top=False,", "                          input_shape=(32, 32, 3))", "base_model.trainable = False  # Freeze!", "", "# Add custom classifier", "x = base_model.output", "x = GlobalAveragePooling2D()(x)", "x = Dense(128, activation='relu')(x)", "outputs = Dense(10, activation='softmax')(x)", "model_tl = Model(inputs=base_model.input, outputs=outputs)", "", "model_tl.compile(optimizer='adam',", "                  loss='sparse_categorical_crossentropy',", "                  metrics=['accuracy'])", "print(f'Total params: {model_tl.count_params():,}')", "print(f'Trainable params: {sum(tf.keras.backend.count_params(w) for w in model_tl.trainable_weights):,}')"]),
    tipBox("Transfer learning: freeze the pretrained base, train only the top layers first. Then optionally fine-tune by unfreezing some base layers with a very low learning rate."),
  ];
}

function lab10() {
  return [
    ...titlePage("10", "Natural Language Processing", ["Preprocess text data (tokenize, lemmatize, remove stopwords)", "Vectorize text with TF-IDF", "Build a sentiment classifier", "Use Hugging Face transformers for zero-shot classification"]),
    h1("Exercise 1: Text Preprocessing"),
    step("Clean and tokenize text"),
    codeBlock(["import re", "import nltk", "from nltk.corpus import stopwords", "from nltk.stem import WordNetLemmatizer", "", "nltk.download('punkt_tab', quiet=True)", "nltk.download('stopwords', quiet=True)", "nltk.download('wordnet', quiet=True)", "", "def preprocess(text):", "    text = text.lower()", "    text = re.sub(r'[^a-z\\s]', '', text)", "    tokens = nltk.word_tokenize(text)", "    stop = set(stopwords.words('english'))", "    tokens = [t for t in tokens if t not in stop and len(t) > 2]", "    lemmatizer = WordNetLemmatizer()", "    tokens = [lemmatizer.lemmatize(t) for t in tokens]", "    return ' '.join(tokens)", "", "sample = 'The movie was absolutely FANTASTIC! I loved the acting and cinematography.'", "print(f'Original: {sample}')", "print(f'Cleaned:  {preprocess(sample)}')"]),
    ...expectedOutput(["Original: The movie was absolutely FANTASTIC! I loved the acting and cinematography.", "Cleaned:  movie absolutely fantastic loved acting cinematography"]),
    step("TF-IDF vectorization"),
    codeBlock(["from sklearn.feature_extraction.text import TfidfVectorizer", "", "documents = [", "    'Machine learning is a subset of artificial intelligence',", "    'Deep learning uses neural networks with many layers',", "    'Natural language processing deals with text data',", "    'Computer vision processes image and video data',", "    'Reinforcement learning trains agents through rewards',", "]", "", "tfidf = TfidfVectorizer(max_features=20)", "X = tfidf.fit_transform(documents)", "", "print(f'Shape: {X.shape}')", "print(f'Features: {tfidf.get_feature_names_out()}')", "print(f'\\nTF-IDF matrix (dense):\\n{X.toarray().round(2)}')"]),
    spacer(), pb(),
    h1("Exercise 2: Sentiment Classification"),
    step("Build a sentiment classifier"),
    codeBlock(["from sklearn.model_selection import train_test_split", "from sklearn.linear_model import LogisticRegression", "from sklearn.metrics import classification_report", "import pandas as pd", "", "# Sample movie reviews (in real projects, load a dataset)", "reviews = pd.DataFrame({", "    'text': [", "        'This movie was amazing and wonderful',", "        'Terrible film, worst I have ever seen',", "        'Great acting and beautiful cinematography',", "        'Boring plot with bad dialogue',", "        'Incredible performance by the lead actor',", "        'Waste of time, extremely disappointing',", "    ] * 20,  # Repeat for more training data", "    'label': [1, 0, 1, 0, 1, 0] * 20", "})", "", "# Vectorize and split", "tfidf = TfidfVectorizer(max_features=1000)", "X = tfidf.fit_transform(reviews['text'].apply(preprocess))", "X_train, X_test, y_train, y_test = train_test_split(", "    X, reviews['label'], test_size=0.2, random_state=42)", "", "# Train", "clf = LogisticRegression(max_iter=1000)", "clf.fit(X_train, y_train)", "print(classification_report(y_test, clf.predict(X_test)))"]),
    step("Use Hugging Face transformers"),
    codeBlock(["# pip install transformers", "from transformers import pipeline", "", "# Sentiment analysis", "classifier = pipeline('sentiment-analysis')", "results = classifier([", "    'I absolutely loved this product!',", "    'This was a complete waste of money.',", "    'It was okay, nothing special.',", "])", "for r in results:", "    print(f\"{r['label']}: {r['score']:.4f}\")"]),
    ...expectedOutput(["POSITIVE: 0.9998", "NEGATIVE: 0.9997", "POSITIVE: 0.9015"]),
    tipBox("Hugging Face pipelines are the fastest way to use pretrained NLP models. For production, fine-tune on your specific data."),
  ];
}

function lab11() {
  return [
    ...titlePage("11", "Quizzes & Practice", ["Test your Python fundamentals", "Practice Pandas data manipulation", "Build ML models under time pressure", "Review common interview questions"]),
    h1("Challenge 1: Python Fundamentals"),
    step("FizzBuzz (Classic Interview Question)"),
    para("Write a function that prints numbers 1-100. For multiples of 3, print 'Fizz'. For multiples of 5, print 'Buzz'. For multiples of both, print 'FizzBuzz'."),
    codeBlock(["def fizzbuzz(n):", "    for i in range(1, n + 1):", "        if i % 15 == 0:", "            print('FizzBuzz', end=' ')", "        elif i % 3 == 0:", "            print('Fizz', end=' ')", "        elif i % 5 == 0:", "            print('Buzz', end=' ')", "        else:", "            print(i, end=' ')", "", "fizzbuzz(20)"]),
    ...expectedOutput(["1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz 13 14 FizzBuzz 16 17 Fizz 19 Buzz"]),
    step("Two Sum"),
    para("Given a list of numbers and a target, return indices of two numbers that add up to the target."),
    codeBlock(["def two_sum(nums, target):", "    seen = {}  # value -> index", "    for i, num in enumerate(nums):", "        complement = target - num", "        if complement in seen:", "            return [seen[complement], i]", "        seen[num] = i", "    return []", "", "print(two_sum([2, 7, 11, 15], 9))   # [0, 1]", "print(two_sum([3, 2, 4], 6))         # [1, 2]"]),
    ...expectedOutput(["[0, 1]", "[1, 2]"]),
    spacer(), pb(),
    h1("Challenge 2: Pandas Practice"),
    step("GroupBy challenge"),
    para("Given a sales DataFrame, find the top 3 products by total revenue per region."),
    codeBlock(["import pandas as pd", "import numpy as np", "", "np.random.seed(42)", "df = pd.DataFrame({", "    'region': np.random.choice(['North', 'South', 'East', 'West'], 100),", "    'product': np.random.choice(['A', 'B', 'C', 'D', 'E'], 100),", "    'quantity': np.random.randint(1, 50, 100),", "    'price': np.random.uniform(10, 100, 100).round(2)", "})", "df['revenue'] = df['quantity'] * df['price']", "", "# Solution", "top3 = (df.groupby(['region', 'product'])['revenue']", "          .sum()", "          .reset_index()", "          .sort_values(['region', 'revenue'], ascending=[True, False])", "          .groupby('region')", "          .head(3))", "print(top3)"]),
    spacer(),
    h1("Challenge 3: ML Pipeline"),
    step("End-to-end classification"),
    para("Build a complete ML pipeline: load data, preprocess, train 3 models, compare performance."),
    codeBlock(["from sklearn.datasets import load_wine", "from sklearn.model_selection import cross_val_score", "from sklearn.preprocessing import StandardScaler", "from sklearn.pipeline import Pipeline", "from sklearn.linear_model import LogisticRegression", "from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier", "", "X, y = load_wine(return_X_y=True)", "", "models = {", "    'Logistic Regression': LogisticRegression(max_iter=1000),", "    'Random Forest': RandomForestClassifier(n_estimators=100),", "    'Gradient Boosting': GradientBoostingClassifier(n_estimators=100),", "}", "", "for name, model in models.items():", "    pipe = Pipeline([('scaler', StandardScaler()), ('model', model)])", "    scores = cross_val_score(pipe, X, y, cv=5, scoring='accuracy')", "    print(f'{name:25s}: {scores.mean():.4f} +/- {scores.std():.4f}')"]),
    ...expectedOutput(["Logistic Regression      : 0.9776 +/- 0.0181", "Random Forest            : 0.9776 +/- 0.0231", "Gradient Boosting        : 0.9664 +/- 0.0278"]),
    tipBox("In interviews and competitions, always start simple (LogisticRegression) as a baseline before trying complex models."),
  ];
}

function lab12() {
  return [
    ...titlePage("12", "LangChain & LLMs", ["Build prompt templates and chains with LangChain", "Implement a RAG pipeline with document retrieval", "Use in-context learning techniques", "Build a question-answering system"]),
    h1("Exercise 1: LangChain Basics"),
    para("Note: You need an OpenAI API key for these exercises. Set it as an environment variable: export OPENAI_API_KEY='your-key-here'"),
    spacer(),
    step("Install dependencies"),
    codeBlock(["# pip install langchain langchain-community langchain-openai", "# pip install chromadb tiktoken"]),
    step("Prompt templates"),
    codeBlock(["from langchain.prompts import PromptTemplate", "", "# Simple template", "template = PromptTemplate(", "    input_variables=['topic', 'level'],", "    template='Explain {topic} to a {level} student in 3 sentences.'", ")", "", "prompt = template.format(topic='neural networks', level='beginner')", "print(prompt)"]),
    ...expectedOutput(["Explain neural networks to a beginner student in 3 sentences."]),
    step("Create an LLM chain"),
    codeBlock(["from langchain_openai import ChatOpenAI", "from langchain.chains import LLMChain", "", "llm = ChatOpenAI(model='gpt-4o-mini', temperature=0.7)", "", "chain = LLMChain(llm=llm, prompt=template)", "result = chain.invoke({'topic': 'gradient descent', 'level': 'intermediate'})", "print(result['text'])"]),
    spacer(), pb(),
    h1("Exercise 2: RAG Pipeline"),
    para("Retrieval-Augmented Generation grounds LLM answers in your own documents."),
    spacer(),
    step("Load and split documents"),
    codeBlock(["from langchain.text_splitter import RecursiveCharacterTextSplitter", "", "# Simulate loading a document", "text = '''", "Machine learning is a subset of artificial intelligence that enables", "systems to learn from data. Supervised learning uses labeled data to", "train models. Common algorithms include linear regression, decision", "trees, and neural networks. Unsupervised learning finds patterns in", "unlabeled data using clustering and dimensionality reduction.", "'''", "", "splitter = RecursiveCharacterTextSplitter(", "    chunk_size=200, chunk_overlap=50)", "chunks = splitter.split_text(text)", "print(f'Number of chunks: {len(chunks)}')", "for i, chunk in enumerate(chunks):", "    print(f'Chunk {i}: {chunk[:60]}...')"]),
    step("Create vector store and query"),
    codeBlock(["from langchain_openai import OpenAIEmbeddings", "from langchain.vectorstores import Chroma", "from langchain.schema import Document", "", "# Create documents", "docs = [Document(page_content=chunk) for chunk in chunks]", "", "# Create vector store", "embeddings = OpenAIEmbeddings()", "vectorstore = Chroma.from_documents(docs, embeddings)", "", "# Query", "results = vectorstore.similarity_search('What is supervised learning?', k=2)", "for doc in results:", "    print(f'Match: {doc.page_content}')"]),
    step("Build QA chain"),
    codeBlock(["from langchain.chains import RetrievalQA", "", "qa = RetrievalQA.from_chain_type(", "    llm=llm,", "    chain_type='stuff',", "    retriever=vectorstore.as_retriever(search_kwargs={'k': 3})", ")", "", "answer = qa.invoke('What algorithms are used in supervised learning?')", "print(answer['result'])"]),
    tipBox("RAG is the most practical way to use LLMs with your own data. The quality of your chunking strategy directly impacts answer quality."),
    spacer(), pb(),
    h1("Exercise 3: In-Context Learning"),
    step("Few-shot prompting"),
    codeBlock(["from langchain.prompts import FewShotPromptTemplate, PromptTemplate", "", "examples = [", "    {'input': 'happy', 'output': 'sad'},", "    {'input': 'tall', 'output': 'short'},", "    {'input': 'fast', 'output': 'slow'},", "]", "", "example_prompt = PromptTemplate(", "    input_variables=['input', 'output'],", "    template='Input: {input}\\nOutput: {output}'", ")", "", "few_shot = FewShotPromptTemplate(", "    examples=examples,", "    example_prompt=example_prompt,", "    prefix='Give the antonym of the input word.',", "    suffix='Input: {word}\\nOutput:',", "    input_variables=['word']", ")", "", "print(few_shot.format(word='bright'))"]),
    ...expectedOutput(["Give the antonym of the input word.", "", "Input: happy", "Output: sad", "", "Input: tall", "Output: short", "", "Input: fast", "Output: slow", "", "Input: bright", "Output:"]),
  ];
}

// =========================================================================
// BUILD ALL
// =========================================================================
const labDefs = [
  { num: 1, slug: "python-fundamentals", title: "Python Fundamentals", fn: lab01 },
  { num: 2, slug: "data-structures-oop", title: "Data Structures & OOP", fn: lab02 },
  { num: 3, slug: "numpy-pandas", title: "NumPy & Pandas", fn: lab03 },
  { num: 4, slug: "data-visualization", title: "Data Visualization", fn: lab04 },
  { num: 5, slug: "eda", title: "Exploratory Data Analysis", fn: lab05 },
  { num: 6, slug: "machine-learning", title: "Machine Learning", fn: lab06 },
  { num: 7, slug: "advanced-ml", title: "Advanced Machine Learning", fn: lab07 },
  { num: 8, slug: "neural-networks", title: "Neural Networks", fn: lab08 },
  { num: 9, slug: "computer-vision", title: "Computer Vision & CNNs", fn: lab09 },
  { num: 10, slug: "nlp", title: "Natural Language Processing", fn: lab10 },
  { num: 11, slug: "practice", title: "Quizzes & Practice", fn: lab11 },
  { num: 12, slug: "langchain-llms", title: "LangChain & LLMs", fn: lab12 },
];

async function main() {
  const outDir = "/Users/michaelwilliams/working/google-colab-notebooks-AI-ML/labs";
  console.log("Generating 12 DOCX lab guides...\n");

  for (const lab of labDefs) {
    const paddedNum = String(lab.num).padStart(2, "0");
    const content = lab.fn();
    const doc = new Document({
      numbering: makeNumbering(),
      styles: makeStyles(),
      sections: [{ properties: pageProps(lab.title, paddedNum), children: content }]
    });
    const buffer = await Packer.toBuffer(doc);
    const outFile = `${outDir}/lab-${paddedNum}-${lab.slug}.docx`;
    fs.writeFileSync(outFile, buffer);
    console.log(`  -> lab-${paddedNum}-${lab.slug}.docx`);
  }
  console.log("\nAll 12 lab guides generated!");
}

main().catch(err => { console.error(err); process.exit(1); });
