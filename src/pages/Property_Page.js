import PropertyPage from '../Components/propertyPage';
import SearchAppBar from '../Components/navbar';

function Property_Page(){
    return(
        <div>
            <SearchAppBar/>
            <main>
                <PropertyPage />
            </main>
        </div>
    )
}

export default Property_Page;