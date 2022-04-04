import React, { useEffect, useState } from "react";
import { FlatList, Platform, SafeAreaView, StyleSheet, Text, TextInput } from "react-native";
import { Button } from "../components/Button";
import { SkillCard } from "../components/SkillCard";

interface SkillData {
    id: string;
    name: string;
}

export const Home = () => {
    const [newSkill, setNewSkill] = useState("");
    const [mySkills, setMySkills] = useState<SkillData[]>([]);
    const [greeting, setGreeting] = useState("");

    function handleAddNewSkill() {
        const data: SkillData = {
            id: String(new Date().getTime()),
            name: newSkill,
        };

        setMySkills((oldState) => [...oldState, data]);
    }

    function handleRemoveSkill(id: string) {
        setMySkills((oldState) => oldState.filter((skill) => skill.id !== id));
    }

    useEffect(() => {
        const currentHour = new Date().getHours();
        console.log(currentHour);
        if (currentHour < 12) {
            setGreeting("Good Morning!");
        } else {
            if (currentHour >= 12 && currentHour < 18) {
                setGreeting("Good Afternoon!");
            } else {
                setGreeting("Good Night!");
            }
        }
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Bem vindo, Leonardo</Text>
            <Text style={styles.greetings}>{greeting}</Text>
            <TextInput
                style={styles.input}
                placeholder="Nova habilidade"
                placeholderTextColor="#555"
                onChangeText={setNewSkill}
            />

            <Button onPress={handleAddNewSkill} title="Add"></Button>
            <Text style={[styles.title, { marginVertical: 50 }]}>Minhas Habilidades</Text>

            <FlatList
                data={mySkills}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <SkillCard skill={item.name} onPress={() => handleRemoveSkill(item.id)}></SkillCard>
                )}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#121015",
        paddingHorizontal: 30,
        paddingVertical: 70,
    },
    title: {
        color: "#fff",
        fontSize: 24,
        fontWeight: "bold",
    },
    input: {
        backgroundColor: "#1f1e25",
        color: "#fff",
        fontSize: 18,
        padding: Platform.OS === "ios" ? 15 : 10,
        marginTop: 30,
        borderRadius: 7,
    },
    greetings: {
        color: "#fff",
    },
});
