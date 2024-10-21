import React from "react";
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Avatar } from 'primereact/avatar';

const NavMenu = ({ onMenuItemClick }) => {
    const items = [
        {
            label: 'Task Builder',
            icon: 'pi pi-user-edit',
            command: () => onMenuItemClick('uncompleted'), 
        },
        {
            label: 'Completed',
            icon: 'pi pi-check-circle',
            command: () => onMenuItemClick('completed'), 
        },
        {
            label: 'Uncompleted',
            icon: 'pi pi-flag',
            command: () => onMenuItemClick('dragTask'), 
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
        }
    ];

    const start = (
        <img
            alt="logo"
            src="https://static.vecteezy.com/system/resources/previews/025/638/355/original/simple-task-icon-the-icon-can-be-used-for-websites-print-templates-presentation-templates-illustrations-etc-free-vector.jpg"
            height="40"
            className="mr-2"
        />
    );

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
