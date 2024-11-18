interface CustomSwitchProps {
    toogle: boolean;
    trigger: () => void;
}

export const CustomSwitch = ({
    toogle,
    trigger,
}:CustomSwitchProps) => {
    return (
        <button 
            className="border border-secondaryColor rounded-full w-14 h-6 grid grid-cols-2 p-1 cursor-pointer relative text-xs no-select"
            style={{
                backgroundColor: toogle ? "#13a164" : "#fff",
            }}
            onClick={trigger}
            >
                <div 
                    className="absolute top-0 left-0 rounded-full w-auto h-full aspect-square duration-300 border-white border-2 transform"
                    
                    style={{
                        backgroundColor: toogle ? "#fff" : "#13a164",
                        transform: toogle ? "translateX(140%)" : "translateX(0)",
                        border: toogle ? "2px solid #13a164" : "2px solid #fff",
                    }}
                />
                <p className="text-white ml-1">{"中"}</p>
                <p className="text-secondaryColor">{"EN"}</p>

        </button>
    );
} 