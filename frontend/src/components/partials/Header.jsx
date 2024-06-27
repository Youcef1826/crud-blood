import { Link } from "react-router-dom";

function Header() {

    return (
        <header>
            <nav className="flex justify-between content-center py-8">
                <h1 className="font-extrabold text-2xl text-red-900">Blood Donor</h1>
                <ul className="flex justify-end gap-12">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/donors">Donors</Link></li>
                    <li><Link className="bg-blue-500 hover:bg-blue-600 py-2 px-6 text-white rounded-md" to="/add-donor">Add donor</Link></li>
                </ul>
            </nav>
        </header>
    );
};
export default Header;