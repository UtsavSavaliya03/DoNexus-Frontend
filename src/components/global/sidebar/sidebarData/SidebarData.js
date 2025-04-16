import Dashboard from "../../../../assets/Dashboard.jsx";
import ToDo from "../../../../assets/ToDo.jsx";

export const SidebarData = [
    {
        title: 'Dashboard',
        icon: <Dashboard />,
        url: '/dashboard',
        activeUrl: ['/dashboard']
    },
    {
        title: 'To Do',
        icon: <ToDo/>,
        url: '/todo',
        activeUrl: ['/todo']
    },
];