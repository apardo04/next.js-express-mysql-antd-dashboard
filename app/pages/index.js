import Page from '../layouts/page';
import AuthenticationForm from '../components/AuthenticationForm'

export const LOGIN = "login";
export const REGISTER = "register";

const Index = (props) => (
    <Page>
        <h1>Hello from next.js</h1>
        <AuthenticationForm view={LOGIN} />
    </Page>
);

export default Index;