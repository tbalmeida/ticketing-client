import React from "react";
import { Link } from "react-router-dom";
export default function Order() {
    return (
        <div>
            <h1>Cart</h1>
            <p>Product Infomation</p>
            <section class="cart-show">
                <div class="panel panel-default items">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th colspan="2">Product</th>
                                <th>Unit Price</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Image1</td>
                                <td>Some event1</td>
                                <td>20CAD</td>
                                <td>2</td>
                                <td>40CAD</td>
                            </tr>
                            <tr>
                                <td>Image2</td>
                                <td>Some event2</td>
                                <td>30CAD</td>
                                <td>3</td>
                                <td>90CAD</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <th colspan="4">TOTAL:</th>
                                <th>130CAD</th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </section>
            <p>Thank you for your order!
                Email used for this order is "blabla@gmail.com"</p>
            <p>
                <Link to="/">Go Home</Link>
            </p>
        </div>
    );
}
