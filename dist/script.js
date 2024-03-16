"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const method_override_1 = __importDefault(require("method-override")); //for supporting put and delete
const controller_1 = require("./controller");
const app = (0, express_1.default)();
app.use(express_1.default.static(path_1.default.join(__dirname, 'static')));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, method_override_1.default)('_method'));
app.set('view engine', 'hbs');
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let alltodo = yield (0, controller_1.gettodo)();
        let completedTodo = yield (0, controller_1.getcomptodo)();
        let len = alltodo.length;
        let id = alltodo[len - 1];
        console.log(id);
        res.render("todo", { alltodo, completedTodo, len, id });
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
}));
app.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { title } = req.body;
        let newTodo = yield (0, controller_1.addtodo)(title);
        console.log(newTodo);
        res.redirect("/");
        // res.status(200).send("Todo added successfully");
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
app.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let id = parseInt(req.params.id);
        console.log(id);
        yield (0, controller_1.deletetodo)(id);
        res.redirect("/");
    }
    catch (err) {
        res.send(err);
    }
}));
app.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let id = parseInt(req.params.id);
        let data = req.body;
        ;
        console.log(data);
        yield (0, controller_1.updatetodo)(id, data.title);
        res.redirect("/");
    }
    catch (err) {
        console.log(err);
        res.send(err);
    }
}));
app.post("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let id = parseInt(req.params.id);
        yield (0, controller_1.checked)(id);
        res.redirect("/");
    }
    catch (err) {
        console.log(err);
        res.json(err);
    }
}));
app.post("/inc/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = parseInt(req.params.id);
    yield (0, controller_1.inc)(id);
    res.redirect("/");
}));
app.post("/dec/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = parseInt(req.params.id);
    yield (0, controller_1.dec)(id);
    res.redirect("/");
}));
app.listen(3000, () => {
    console.log('Server started at port: 3000');
});
