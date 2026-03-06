// ===== 1. 基础类型与字面量类型 =====

type PrimitiveType = string | number | boolean | null | undefined;
type LiteralUnion = "red" | "green" | "blue";
type TupleType = [string, number, boolean];

const color: LiteralUnion = "red";
const tuple: TupleType = ["hello", 42, true];

// ===== 2. 接口与类型别名 =====

interface Animal {
    name: string;
    age: number;
    readonly id: string;
    speak?(): string;
}

interface Dog extends Animal {
    breed: string;
    fetch(item: string): void;
}

type Cat = Animal & {
    indoor: boolean;
    purr(): void;
};

// ===== 3. 泛型 =====

function identity<T>(value: T): T {
    return value;
}

function first<T>(arr: T[]): T | undefined {
    return arr[0];
}

interface Repository<T extends { id: string }> {
    findById(id: string): T | undefined;
    findAll(): T[];
    save(entity: T): void;
    delete(id: string): boolean;
}

// ===== 4. 类 =====

abstract class BaseEntity {
    readonly id: string;
    createdAt: Date;

    constructor(id: string) {
        this.id = id;
        this.createdAt = new Date();
    }

    abstract toJSON(): Record<string, unknown>;

    toString(): string {
        return `[${this.constructor.name}:${this.id}]`;
    }
}

class User extends BaseEntity {
    name: string;
    email: string;
    private _passwordHash: string = "";

    constructor(id: string, name: string, email: string) {
        super(id);
        this.name = name;
        this.email = email;
    }

    get displayName(): string {
        return `${this.name} <${this.email}>`;
    }

    setPassword(raw: string): void {
        this._passwordHash = raw; // simplified
    }

    toJSON(): Record<string, unknown> {
        return { id: this.id, name: this.name, email: this.email };
    }
}

// ===== 5. 枚举 =====

enum Direction {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT",
}

const enum Status {
    Pending,
    Active,
    Inactive,
    Deleted,
}

// ===== 6. 高级类型工具 =====

type Partial_<T> = { [K in keyof T]?: T[K] };
type Required_<T> = { [K in keyof T]-?: T[K] };
type Readonly_<T> = { readonly [K in keyof T]: T[K] };
type Pick_<T, K extends keyof T> = { [P in K]: T[P] };
type Exclude_<T, U> = T extends U ? never : T;
type NonNullable_<T> = T extends null | undefined ? never : T;

type UserUpdate = Partial_<Pick_<User, "name" | "email">>;

// 条件类型
type IsString<T> = T extends string ? true : false;
type Flatten<T> = T extends Array<infer Item> ? Item : T;

type FlatStr = Flatten<string[]>;    // string
type FlatNum = Flatten<number>;      // number

// 模板字面量类型
type EventName<T extends string> = `on${Capitalize<T>}`;
type ClickEvent = EventName<"click">;  // "onClick"

// ===== 7. 函数重载 =====

function format(value: string): string;
function format(value: number, decimals?: number): string;
function format(value: string | number, decimals = 2): string {
    if (typeof value === "string") return value.trim();
    return value.toFixed(decimals);
}

// ===== 8. 装饰器（类型声明层面） =====

type ClassDecorator_ = (target: Function) => void;
type MethodDecorator_ = (target: object, key: string, descriptor: PropertyDescriptor) => void;

// ===== 9. 异步编程 =====

async function fetchUser(id: string): Promise<User | null> {
    // 模拟异步操作
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(new User(id, "Alice", "alice@example.com"));
        }, 100);
    });
}

async function processUsers(ids: string[]): Promise<User[]> {
    const results = await Promise.all(ids.map(id => fetchUser(id)));
    return results.filter((u): u is User => u !== null);
}

// ===== 10. Generator =====

function* range(start: number, end: number, step = 1): Generator<number> {
    for (let i = start; i < end; i += step) {
        yield i;
    }
}

async function* asyncStream<T>(items: T[], delay = 10): AsyncGenerator<T> {
    for (const item of items) {
        await new Promise(r => setTimeout(r, delay));
        yield item;
    }
}

// ===== 11. 命名空间 =====

namespace Geometry {
    export interface Point {
        x: number;
        y: number;
    }

    export interface Circle {
        center: Point;
        radius: number;
    }

    export function distance(a: Point, b: Point): number {
        return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
    }

    export function area(circle: Circle): number {
        return Math.PI * circle.radius ** 2;
    }
}
