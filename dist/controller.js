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
Object.defineProperty(exports, "__esModule", { value: true });
exports.dec = exports.inc = exports.deletetodo = exports.checked = exports.updatetodo = exports.getcomptodo = exports.gettodo = exports.addtodo = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function addtodo(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const todo = yield prisma.todo.create({
            data: {
                title: data
            }
        });
        return todo;
    });
}
exports.addtodo = addtodo;
function gettodo() {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield prisma.todo.findMany({
            where: {
                completed: false
            },
            orderBy: {
                priority: 'desc'
            }
        });
        return users;
    });
}
exports.gettodo = gettodo;
function getcomptodo() {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield prisma.todo.findMany({
            where: {
                completed: true
            }
        });
        return users;
    });
}
exports.getcomptodo = getcomptodo;
function updatetodo(id, title) {
    return __awaiter(this, void 0, void 0, function* () {
        yield prisma.todo.update({
            where: {
                id: id
            },
            data: {
                title: title
            }
        });
    });
}
exports.updatetodo = updatetodo;
function checked(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let check = yield prisma.todo.findUnique({
            where: {
                id: id
            },
        });
        yield prisma.todo.update({
            where: {
                id: id
            },
            data: {
                completed: !(check === null || check === void 0 ? void 0 : check.completed)
            }
        });
    });
}
exports.checked = checked;
function deletetodo(id) {
    return __awaiter(this, void 0, void 0, function* () {
        yield prisma.todo.delete({
            where: {
                id: id
            },
        });
    });
}
exports.deletetodo = deletetodo;
function inc(id) {
    return __awaiter(this, void 0, void 0, function* () {
        yield prisma.todo.update({
            where: {
                id: id
            },
            data: {
                priority: {
                    increment: 1
                }
            }
        });
    });
}
exports.inc = inc;
function dec(id) {
    return __awaiter(this, void 0, void 0, function* () {
        yield prisma.todo.update({
            where: {
                id: id
            },
            data: {
                priority: {
                    decrement: 1
                }
            }
        });
    });
}
exports.dec = dec;
