export default async function fetchData<Interface>(url : string): Promise<Interface | null>{
  try{
    const response = await fetch(url);
    console.log(response);
    if(!response.ok) throw new Error("Erro :" + response.status);
    const json = await response.json();
    return json;
  }catch(error){
    if(error instanceof Error) console.error('fetchData :' + error.message)
  return null;
  
  }
}