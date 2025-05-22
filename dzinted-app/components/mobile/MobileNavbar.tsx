import { Pressable, Text, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { usePathname, useRouter } from "expo-router";

type IconName =
    | "home-outline" | "home"
    | "heart-outline" | "heart"
    | "add-circle-outline" | "add-circle"
    | "mail-outline"
    | "settings-outline" | "settings" | 'mail';

type NavigationItem = {
    path: string;
    name: string;
    icon: IconName;
    selected_icon: IconName;
};

const navigations: NavigationItem[] = [
    {
        path: '/',
        name: 'Home',
        icon: 'home-outline',
        selected_icon: "home",
    },
    {
        path: '/favorites',
        name: 'Favorites',
        icon: 'heart-outline',
        selected_icon: "heart",
    },
    {
        path: '/publish',
        name: 'Publish',
        icon: 'add-circle-outline',
        selected_icon: "add-circle",
    },
    {
        path: '/messages',
        name: 'Messages',
        icon: 'mail-outline',
        selected_icon: "mail",
    },
    {
        path: '/settings',
        name: 'Settings',
        icon: 'settings-outline',
        selected_icon: "settings",
    }
];

interface MobileNavbarProps {
    onWeb: boolean;
}

export default function MobileNavbar({onWeb}: MobileNavbarProps) {
    let icon_size = 20;
    let icon_color = 'green';
    const pathname = usePathname();
    const router = useRouter()


    return (
        <View className={ (onWeb ? 'md:hidden ': '' )+ "absolute bottom-0 left-0 right-0 z-100 w-[100vw] border-t-2 border-gray-200"}>
            <View className="flex flex-row gap-2 justify-between items-center py-2 px-5">

                {
                    navigations.map((nav, i) => {
                        return (
                            <Pressable key={i} onPress={() => router.push(nav.path)} className="flex justify-center items-center">
                                <Ionicons name={pathname == nav.path ? nav.selected_icon : nav.icon} color={icon_color} size={icon_size} />
                                <Text>{nav.name}</Text>
                            </Pressable>
                        );
                    })
                }

            </View>
        </View>
    );
}

function getNavbarIcon() {
    const pathname = usePathname();

    if (pathname == '/') {

    }
}