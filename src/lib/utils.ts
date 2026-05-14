export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

export function generateWhatsAppLink(
  phoneNumber: string, 
  cartItems: { name: string; quantity: number; price: number }[],
  customerInfo: { name: string; address: string; phone: string; payment: string }
): string {
  // Format standard number e.g., 0812... to 62812...
  let formattedPhone = phoneNumber.replace(/\D/g, '');
  if (formattedPhone.startsWith('0')) {
    formattedPhone = '62' + formattedPhone.substring(1);
  }
  
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  let message = `Halo, saya ingin memesan perlengkapan beladiri:%0A%0A`;
  
  cartItems.forEach((item, index) => {
    message += `${index + 1}. ${item.name} - ${item.quantity}x (${formatRupiah(item.price)})%0A`;
  });
  
  message += `%0A*Total: ${formatRupiah(total)}*%0A%0A`;
  
  message += `*Data Pengiriman:*%0A`;
  message += `Nama: ${customerInfo.name}%0A`;
  message += `No. HP: ${customerInfo.phone}%0A`;
  message += `Alamat Lengkap: ${customerInfo.address}%0A`;
  message += `Metode Pembayaran: ${customerInfo.payment}%0A%0A`;
  message += `Tolong konfirmasi total biaya beserta ongkos kirim. Terima kasih!`;
  
  return `https://wa.me/${formattedPhone}?text=${message}`;
}
