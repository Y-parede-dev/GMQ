# Ouvre le fichier texte en mode écriture
with open("videos.txt", "w") as file:
    # Pour chaque vidéo dans les listes
    for i in range(len(videoPaths)):
        # Écrit les informations de la vidéo dans le fichier
        file.write(f"{videoPaths[i]},{videoNames[i]}\n")