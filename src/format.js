// Shared formatting: the brief asks for vi-VN prices such as "95.000 đ".
export const vnd = (amount) => amount.toLocaleString('vi-VN') + ' đ';

// "0 items", "1 item", "2 items", ...
export const itemLabel = (count) => (count === 1 ? '1 item' : `${count} items`);
