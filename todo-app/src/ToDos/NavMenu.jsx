import React from "react";
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar';  
import { Link } from "react-router-dom";


const NavMenu = () => {
    const itemRenderer = (item) => (
        <a className="flex align-items-center p-menuitem-link">
            <span className={item.icon} />
            <span className="mx-2">{item.label}</span>
            {item.badge && <Badge className="ml-auto" value={item.badge} />}
            {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
        </a>
    );

    const items = [
        {
            label: 'Completed',
            icon: 'pi pi-check',
            template: (item) => (
                <Link to="/completed" className="flex align-items-center p-menuitem-link">
                    <span className={item.icon} />
                    <span className="mx-2">{item.label}</span>
                </Link>
            )
        },
        {
            label: 'Uncompleted',
            icon: 'pi pi-flag'
        },
        {
            label: 'Projects',
            icon: 'pi pi-search',
            items: [
                // ... your project items
            ]
        },
        {
            label: 'Contact',
            icon: 'pi pi-envelope',
            badge: 3,
            template: itemRenderer
        }
    ];

    const start = <img alt="logo" src="https://static.vecteezy.com/system/resources/previews/025/638/355/original/simple-task-icon-the-icon-can-be-used-for-websites-print-templates-presentation-templates-illustrations-etc-free-vector.jpg" height="40" className="mr-2" />;
    const end = (
        <div className="flex align-items-center gap-2">
            <InputText placeholder="Search" type="text" className="w-8rem sm:w-auto" />
            <Avatar image="https://media.licdn.com/dms/image/v2/D5603AQHSTUeDc3C0rQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1723237774203?e=1732752000&v=beta&t=l-2jJcKG0G8RHnNUoffUC8kwVWiH4jooLhe9uTzvVw4" shape="circle" />
        </div>
    );

    return (
        <div className="card">
            <Menubar className="menubar" model={items} start={start} end={end} />
        </div>
    );
}

export default NavMenu;