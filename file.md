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

| Feature          | PUT                                    | PATCH                              |
| ---------------- | -------------------------------------- | ---------------------------------- |
| Purpose          | Replace the entire resource            | Update only specific fields        |
| Request body     | Usually contains the complete resource | Contains only the fields to change |
| Unchanged fields | Typically included in the request      | Left unchanged automatically       |
| Common use       | Full update                            | Partial update                     |




--Exploer shcemaTypes - Today - 08-08-2026






//userAPI - GET /user firstName of the  user data from database.
//you can see the data using what you want main we use "find() method"
app.get("/user", async (req, res) => {
    const userName = req.body.firstName;
    try {

        const user = await User.findOne({ firstName: userName });
        res.send(user);
        // const users = await User.find({ firstName: userName });
        // if (user.length === 0) {
        //     res.status(404).send("User is not found");
        // } else {
        //     res.send(user._id);
        // }
    } catch (error) {
        res.status(400).send("user name not there");
    }
});

//Feed API - GET /"Feed"  get the all user data from database.
app.get("/feed", async (req, res) => {
    try {
        const user = await User.find({});
        res.send(user);
    } catch (error) {
        res.status(400).send("Users are not Found");
    }
});

// ID API - GET "ID" by userName or firstName
app.get("/id", async (req, res) => {
    const userName = req.body.firstName;
    try {

        const user = await User.findById({ _id: userName });
        // res.send(user);
        // const users = await User.find({ firstName: userName });
        if (user.length === 0) {
            res.status(404).send("User is not found");
        } else {
            res.send(user._id);
        }
    } catch (error) {
        res.status(400).send("user name not there");
    }
});

app.delete("/user", async (req, res) => {
    const userId = req.body.userId;
    try {
        console.log(userId)
        //const user = await User.findByIdAndDelete(userId);

        const user = await User.findOneAndDelete({ _id: userId })

        if (!user) {
            res.status(404).send("User Already Deleted Succesfull");
        } else {
            res.send("User Delete Succesfull");
        }
    } catch (error) {
        res.status(400).send("Somthing Went Worng");
    }
});


app.put("/user", async (req, res) => {
    const userId = req.body.userId;
    const firstName = req.body.firstName
    try {
        const user = await User.findByIdAndUpdate(userId, { firstName }, { returnDocument: "after" })
        // console.log(req.body.userId);
        console.log(user);
        res.send(user)
    } catch (error) {
        res.status(400).send("Somthing Went Worng");
    }
});


app.patch("/user/:userId", async (req, res) => {
    const userId = req.params?.userId;
    const data = req.body;
    try {
        const ALLOWED_UPDATES = ["age", "skills", "gender", "password"]
        const isUpdatedAllowed = Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k));
        if (!isUpdatedAllowed) {
            throw new Error("update is not allow")
        };
        const user = await User.findByIdAndUpdate({ _id: userId }, data, { runValidators: true, returnDocument: "after" })
        // console.log(req.body.userId);
        res.send(user);

    } catch (error) {
        res.status(400).send("Somthing Went Worng : " + error.message);
    };
});
