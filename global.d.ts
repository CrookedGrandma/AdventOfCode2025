declare type Output = string | number | (string | number)[];

declare interface Position {
    x: number;
    y: number;
}

declare interface RangeT<T = number> {
    from: T;
    to: T;
}

declare interface AStarNode<T> {
    item: T;
    cameFrom?: AStarNode<T>;
    gScore: number;
    fScore: number;
}
