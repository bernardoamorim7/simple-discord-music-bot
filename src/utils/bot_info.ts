import { CustomClient } from "../index";

/** 
 * Function to create a rectangle with bot information
 */
export function createBotInfoRectangle(client: CustomClient): string {
    if (!client.user) return "Bot is not online!";

    // Base strings without dynamic content
    const baseStrings = [
        "Simple Discord Music Bot v1.0.0",
        "Bot is online!",
        "",
        "",
    ];

    // Dynamic strings that might change in length
    const dynamicStrings = [
        `Bot ID: ${client.user?.id}`,
        `Bot Name: ${client.user?.tag}`,
    ];

    // Find the longest string to determine padding
    const longestString = Math.max(...baseStrings.map(s => s.length), ...dynamicStrings.map(s => s.length));

    // Function to pad strings to the right length
    const padString = (s: string) => s + " ".repeat(longestString - s.length);

    // Construct the rectangle
    const rectangle = [
        "-" + "-".repeat(longestString + 1) + "--",
        "| " + padString(baseStrings[0]) + " |",
        "| " + " ".repeat(longestString) + " |",
        "| " + padString(baseStrings[1]) + " |",
        "| " + padString(dynamicStrings[0]) + " |",
        "| " + padString(dynamicStrings[1]) + " |",
        "| " + padString(baseStrings[2]) + " |",
        "-" + "-".repeat(longestString + 1) + "--",
    ];

    return rectangle.join("\n");
}