import 'vite/client'


declare module '*.svg' {
    const content: any;
    export default content;
}
declare module "*.jpg" {
    const content: any;
    export default content;
}
declare module "*.module.css";
declare module "*.module.scss";
declare module 'react-places-autocomplete';
declare module 'react-chat-engine'

export { };
declare global {
    interface Window {
        initMap: () => void;  // this will be your variable name
    }
}