export function formatPrice(price) {
  return (
    price &&
    price.toLocaleString('vi-vn', { style: 'currency', currency: 'VND' })
  );
}
