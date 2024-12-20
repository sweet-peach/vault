import styles from "./FilesTable.module.scss";
import Loader from "@/app/components/Loader/Loader";
import {useContext, useEffect, useRef} from "react";
import {DriveContext} from "@/app/(panel)/drive/page";

function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
}


export default function FilesTable({isSearching, isGettingFiles}) {
    const {files, openDirectory, showContextMenu, setIgnoreFileMenuContextRefs} = useContext(DriveContext);
    const ignoreRef = useRef(null)
    function handleContextMenu (event, file){
        event.preventDefault();
        const parentNode = event.currentTarget;
        showContextMenu(event,parentNode,file)
    };

    useEffect(()=>{
        setIgnoreFileMenuContextRefs([ignoreRef])
    },[ignoreRef])

    function Directory({directory}){
        return (
            <div onContextMenu={(event)=>{ handleContextMenu(event, directory)}} onClick={()=>{openDirectory(directory)}} className={`${styles.file} ${styles.grid}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                     viewBox="0 0 256 256">
                    <path
                        d="M216,72H131.31L104,44.69A15.88,15.88,0,0,0,92.69,40H40A16,16,0,0,0,24,56V200.62A15.41,15.41,0,0,0,39.39,216h177.5A15.13,15.13,0,0,0,232,200.89V88A16,16,0,0,0,216,72ZM40,56H92.69l16,16H40Z"></path>
                </svg>
                <p>{directory.name}</p>
                <p>{directory.date.slice(0, 10)}</p>
                <p>file folder</p>
                <p></p>
            </div>
        )
    }

    function File({file}) {
        return (
            <div onContextMenu={(event)=>{ event.preventDefault(); handleContextMenu(event, file)}} className={`${styles.file} ${styles.grid}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                     viewBox="0 0 256 256">
                    <path
                        d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM152,88V44l44,44Z"></path>
                </svg>
                <p >{file.name}</p>
                <p>{file.date.slice(0, 10)}</p>
                <p>{file.type}</p>
                <p>{formatBytes(file.size)}</p>
            </div>
        )
    }

    function FilesList({files}) {
        if(files.length === 0){
            if(isSearching){
                return <div className={styles.directoryEmpty}>Nothing found</div>
            } else {
                return <div className={styles.directoryEmpty}>This directory is empty</div>
            }
        }
        return files.map((file, index) => {
            if (file.type === 'dir') {
                return <Directory key={index} directory={file}></Directory>
            } else {
                return <File key={index} file={file}></File>
            }
        })
    }

    return (
        <>
            <header className={`${styles.grid} ${styles.tableHeader}`}>
                <p></p>
                <p>Name</p>
                <p>Date modified</p>
                <p>Type</p>
                <p>Size</p>
            </header>
            <div ref={ignoreRef} className={styles.filesList}>
            {isGettingFiles ?
                    <div className={styles.loaderWrapper}>
                        <Loader scale="1"></Loader>
                    </div>
                    :
                    <FilesList files={files}></FilesList>
                }

            </div>
        </>
    )
}