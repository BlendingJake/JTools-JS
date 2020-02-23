export declare class Formatter {
    private readonly spec;
    private readonly fallback;
    private failed;
    constructor(spec: string, fallback?: any);
    single(item: any): string | any;
    many(items: any[]): (string | any)[];
    _replace(spec: string, item: any): string | any;
    _replacer(match: any[], item: any): string;
}
