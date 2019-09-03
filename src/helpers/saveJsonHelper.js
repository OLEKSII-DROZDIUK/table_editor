const saveJsonHelper = (json) => {
    
    const fileData = JSON.stringify(json);
    const blob = new Blob([fileData], {type: "text/plain"});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    link.download = 'hexa_table.json';
    link.href = url;
    link.click();
 
}

export default saveJsonHelper;