var cursos = [{
        "nome": "001 - Técnico em Desenvolvimento de Sistemas",
        "sigla": "DS",
        "icone": "https://img.icons8.com/sf-black-filled/ffffff/344/source-code.png",
        "carga": "1200",
    },
    {
        "nome": "002 - Técnico em Redes de Computadores",
        "sigla": "RDS",
        "icone": "https://img.icons8.com/wired/ffffff/344/networking-manager.png",
        "carga": "1200"
    }
];

//feito
const listCursos = () => cursos;

const getCursos = function (siglaCurso) {
    curselistJSON = {}
    curselist = []
    cursos.forEach(item => {
        if (siglaCurso === item.sigla.toLowerCase()) {
            curselist.push({
                nome: item.nome,
                sigla: item.sigla,
                icone: item.icone,
                carga: item.carga
            })
        }
    });
    console.log(siglaCurso, cursos, curselist);
    curselistJSON.cursos = curselist
    return curselistJSON
}
module.exports = {
    listCursos,
    getCursos
}