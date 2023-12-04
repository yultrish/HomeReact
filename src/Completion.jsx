function Completion(props) {
    return <h1>Thank you! 🎉</h1>;
  }
  
  export default Completion;

  const calculateTotalAmount = () => {
    // Check if orders is defined and has items
    if (!orders || orders.length === 0) {
      // Handle the case where orders is undefined or empty
      return 0;
    }

    const prices = orders.map((order) =>
      parseFloat(order.products.price.toFixed(2))
    );
    const taxRate = 0.2;
    const totalTax = taxRate * prices.reduce((total, price) => total + price, 0);
    const subtotal = prices.reduce((total, price) => total + price, 0);
    const total = subtotal - totalTax;

    return total; 
  }


  