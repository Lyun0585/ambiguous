function showline() {
    link.getLink()
    fbq('track', 'Purchase', {value: 1.00, currency: 'USD'});
    fbq('track', 'AddToCart');
}