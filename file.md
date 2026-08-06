-pratice error handling also message typing 
---JavaScript objects and JSON look similar, but they are **not the same thing**.

| JavaScript Object                                          | JSON                                                                  |
| ---------------------------------------------------------- | --------------------------------------------------------------------- |
| A data structure used in JavaScript                        | A text format for storing and exchanging data                         |
| Can contain functions, `undefined`, `Date`, `Symbol`, etc. | Only supports strings, numbers, booleans, `null`, arrays, and objects |
| Keys can be unquoted (if valid identifiers)                | Keys **must** be enclosed in double quotes                            |
| Can use single or double quotes for strings                | Must use **double quotes** for strings                                |
| Exists as an object in memory                              | Exists as a string                                                    |

### JavaScript Object

```javascript
const person = {
  name: "Alice",
  age: 25,
  isStudent: false,
  greet() {
    console.log("Hello");
  },
  city: undefined
};
```

Features:

* Can have methods (functions).
* Can contain `undefined`.
* Can use computed properties, prototypes, classes, etc.

### JSON

```json
{
  "name": "Alice",
  "age": 25,
  "isStudent": false
}
```

Features:

* Pure text.
* Used for APIs, configuration files, and data exchange.
* Cannot contain functions or `undefined`.
* Property names must be in double quotes.

---

## Converting Between Them

### Object → JSON

Use `JSON.stringify()`.

```javascript
const person = {
  name: "Alice",
  age: 25
};

const json = JSON.stringify(person);

console.log(json);
// '{"name":"Alice","age":25}'
```

### JSON → Object

Use `JSON.parse()`.

```javascript
const json = '{"name":"Alice","age":25}';

const person = JSON.parse(json);

console.log(person.name);
// Alice
```

---

## Invalid JSON Examples

These are valid JavaScript objects but **invalid JSON**:

❌ Unquoted key

```javascript
{
  name: "Alice"
}
```

❌ Single quotes

```javascript
{
  "name": 'Alice'
}
```

❌ Function

```javascript
{
  "name": "Alice",
  "greet": function () {}
}
```

❌ Trailing comma

```javascript
{
  "name": "Alice",
}
```

---

## Real-world Usage

**JavaScript Object** (inside your code)

```javascript
const user = {
  id: 1,
  name: "John"
};

console.log(user.name);
```

**JSON** (sent over a network)

```http
GET /users/1
```

Response body:

```json
{
  "id": 1,
  "name": "John"
}
```

After receiving the response:

```javascript
const user = JSON.parse(responseBody);
console.log(user.name);
```

---

### Quick way to remember

* **JavaScript Object** = a live data structure your program works with.
* **JSON** = a string representation of data used to store or transmit it.

A common workflow is:

```text
JavaScript Object
        │
JSON.stringify()
        ▼
     JSON string
        │
   (send/store)
        │
JSON.parse()
        ▼
JavaScript Object
```
