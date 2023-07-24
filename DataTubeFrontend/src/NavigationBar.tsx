import React from 'react'
import {Link} from "react-router-dom";

type FadeButtonProperties = {
    button_id: string,
    inner_text: string,
    links_to: string,
}

export const FadeButton: React.FC<FadeButtonProperties> = (properties) => {
    return (
        <>
            <button className="fade-button" id={properties.button_id} style={{ textDecoration: 'none' }}>
                <Link to={properties.links_to}>{properties.inner_text}</Link>
            </button>
        </>
    );
}

type NavigationBarProperties = {
    bar_id: string,
    buttons: Array<[string, string, string]>,
}

export const NavigationBar: React.FC<NavigationBarProperties> = (properties) => {

    const button_maker = (button_property_tuple: [string, string, string]) => {
        const button_id = button_property_tuple[0];
        const inner_text = button_property_tuple[1];
        const links_to = button_property_tuple[2];
        return <FadeButton button_id={button_id} inner_text={inner_text} links_to={links_to}/>
    }
    
    const button_collection = properties.buttons.map(button_maker);

    return (
        <>
            <div id={properties.bar_id}>
                <nav id={properties.bar_id}>
                    {button_collection}
                </nav>
            </div>
        </>
    );
}