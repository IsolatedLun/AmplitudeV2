import { ColorSchemeContext } from "@/components/contexts/ColorSchemeContext";
import Navbar from "@/components/misc/Navbar";
import Icon from "@/components/typography/Icon";
import { EIcon_Size, EIcon_Theme } from "@/components/typography/types";
import { Tabs } from "expo-router";
import { useContext } from "react";

function constructTab(theme: any, props: any) {
    return(
        <Tabs.Screen name={props.name} options={{
            title: props.title,
            tabBarInactiveTintColor: theme.muted,
            tabBarActiveTintColor: theme.primary,
            tabBarLabelStyle: { fontSize: 12 },
            tabBarIcon: ({ focused }) => (
                <Icon 
                    name={focused ? (props.activeIcon ?? props.icon) : props.icon}
                    theme={focused ? EIcon_Theme.Primary : EIcon_Theme.Muted}
                    size={EIcon_Size.Huge}
                />
            )
        }} />
    )
}

const MainLayout = () => {
    const { state: { theme } } = useContext(ColorSchemeContext);
    const tabs: any[] = [
        { name: "songs", title: "Songs", icon: "music-circle-outline", activeIcon: "music-circle" },
        { name: "favorites", title: "Favorites", icon: "heart-circle-outline", activeIcon: "heart-circle" },
        { name: "upload", title: "Upload", icon: "upload-circle-outline", activeIcon: "upload-circle" },
        { name: "settings", title: "Settings", icon: "cog-outline", activeIcon: "cog" }
    ]

    return(
        <>
            <Navbar />
            <Tabs screenOptions={{
                headerShown: false,
                sceneStyle: { backgroundColor: "transparent" },
                tabBarStyle: { 
                    backgroundColor: "transparent",
                    elevation: 0,
                    boxShadow: "none",
                    borderTopWidth: 0,
                },
            }}
            >
                { tabs.map(tab => constructTab(theme, tab)) }
            </Tabs>
        </>
    )
};

export default MainLayout;