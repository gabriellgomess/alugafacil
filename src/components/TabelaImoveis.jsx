import React, { useState, useEffect, useContext } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, getKeyValue, Button, useDisclosure } from "@nextui-org/react";
import { EditIcon } from "./EditIcon";
import { DeleteIcon } from "./DeleteIcon";
import { EyeIcon } from "./EyeIcon";
import axios from 'axios';
import { MyContext } from "../contexts/MyContext";

const statusColorMap = {
    locado: "success",
    manutenção: "danger",
    vago: "warning",
};

import ModalCadImovel from './ModalCadImovel';

export default function TabelaImoveis() {
    const { rootState } = useContext(MyContext);
    const { theUser } = rootState;
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [ imoveis, setImoveis ] = useState([]);

    const [selectedImovel, setSelectedImovel] = useState(null);


    useEffect(() => {
        // Fetch data from your API endpoint using Axios
        axios.get("https://alugafacil.tech/api/busca_imoveis.php")
            .then(response => {
                setImoveis(response.data); // Update the state with fetched data
                console.log(response.data); // Log the data for debugging
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);


    const renderCell = React.useCallback((imovel, columnKey) => {
        const cellValue = imovel[columnKey];

        switch (columnKey) {
            case "identificacao":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize text-default-400">{imovel.id}</p>
                        <p className="text-bold text-sm capitalize">{imovel.endereco}</p>                        
                    </div>
                );
            case "valor_aluguel":
                return cellValue; // Render value directly for this column
            case "status":
                return (
                    <Chip className="capitalize" color={statusColorMap[imovel.status]} size="sm" variant="flat">
                        {cellValue}
                    </Chip>
                );
            case "actions":
                return (
                    <div className="relative flex items-center gap-2">
                       <Tooltip color="success" content="Editar Imóvel">
                            <span
                                className="text-lg text-success text-default-400 cursor-pointer active:opacity-50"
                                onClick={() => {
                                    setSelectedImovel(imovel); // Set the selected property for editing
                                    onOpen(); // Open the modal
                                }}
                            >
                                <EditIcon />
                            </span>
                        </Tooltip>
                        <Tooltip color="danger" content="Excluir Imóvel">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                <DeleteIcon />
                            </span>
                        </Tooltip>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);


    const columns = [
        { name: "IDENTIFICAÇÃO", uid: "identificacao" },
        { name: "VALOR ALUGUEL", uid: "valor_aluguel" },
        { name: "STATUS", uid: "status" },
        { name: "AÇÕES", uid: "actions" },
    ];
    const listImoveis = imoveis.map(imovel => ({
        id: imovel.id,
        endereco: imovel.endereco,
        numero: imovel.numero,
        complemento: imovel.complemento,
        bairro: imovel.bairro,
        cidade: imovel.cidade,
        estado: imovel.estado,
        locadorID: imovel.locadorID,
        descricao: imovel.descricao,
        banheiros: imovel.banheiros,
        quartos: imovel.quartos,
        garagem: imovel.garagem, 
        valor_aluguel: imovel.valor_aluguel,
        status: imovel.status,
        outras_caracteristicas: imovel.outras_caracteristicas,
        data_disponibilidade: imovel.data_disponibilidade,
    }));

    return (
        <>
            <div className="w-100 flex justify-end">
                <Button onClick={onOpen} color="success">
                    Adicionar Imóvel
                </Button>
            </div>

            <Table className='mt-2' aria-label="Example table with custom cells">
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={listImoveis}>
                    {(item) => (
                        <TableRow key={item.id}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <ModalCadImovel isOpen={isOpen} onOpenChange={onOpenChange} idUser={theUser.id} selectedImovel={selectedImovel} />

        </>
    );
}
