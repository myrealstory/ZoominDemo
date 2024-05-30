"use client";
import { store } from "@/redux/store";
import { Provider } from "react-redux";


interface ReduxProviderProps {
    children: React.ReactNode;
    initValue?: any;
    lang: string;
    }

export function ReduxProvider({children, initValue, lang}: ReduxProviderProps){
    return (
        <Provider store={store}>
            {/* <ChildrenComponent lang={lang} initVale={initValue}> */}
                {children}
            {/* </ChildrenComponent> */}
        </Provider>
    )
}