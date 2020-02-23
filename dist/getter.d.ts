declare type SpecialFunction = (value: any, ...args: any[]) => any;
interface Special {
    special: string;
    args: any[];
}
export declare class Getter {
    private readonly multiple;
    private readonly field;
    private readonly fallback;
    private readonly parts;
    constructor(field: string | string[], fallback?: any);
    _process_field(field: string): (string | Special)[];
    _parse_special(text: string, args_text: string): Special;
    static full_regex(): string;
    static register_special(name: string, func: SpecialFunction): boolean;
    single(item: any): any | any[];
    many(items: any[]): any[] | any[][];
}
export {};
