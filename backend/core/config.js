const config = {
    avatar_maximum_size: 1024*1024*5,
    files_directory: "", // Sets the directory for storing files. Defaults to the server root. If empty, a "files" directory will be created at boot to store all data.
    avatars_directory: "", // Sets the directory for storing avatars. Defaults to the server root. If empty, an "avatars" directory will be created at boot to store all data.
    jwt_expiration_in_ms: 7 * 24 * 60 * 60 * 1000 //7 days by default
}

export default config