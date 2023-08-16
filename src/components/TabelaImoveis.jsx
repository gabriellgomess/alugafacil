import React, { useState, useEffect } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, getKeyValue, Button, useDisclosure } from "@nextui-org/react";
import { EditIcon } from "./EditIcon";
import { DeleteIcon } from "./DeleteIcon";
import { EyeIcon } from "./EyeIcon";
import axios from 'axios';

const statusColorMap = {
    locado: "success",
    manutenção: "danger",
    vago: "warning",
};

import ModalCadImovel from './ModalCadImovel';

export default function TabelaImoveis() {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [imoveis, setImoveis] = useState([]);

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
                        <p className="text-bold text-sm capitalize">{cellValue}</p>
                        <p className="text-bold text-sm capitalize text-default-400">{imovel.id}</p>
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
                        <Tooltip color="warning" content="Detalhes">
                            <span className="text-lg text-warning text-default-400 cursor-pointer active:opacity-50">
                                <EyeIcon />
                            </span>
                        </Tooltip>
                        <Tooltip color="success" content="Editar Imóvel">
                            <span className="text-lg text-success text-default-400 cursor-pointer active:opacity-50">
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
        identificacao: imovel.endereco, // Renomeei para corresponder à coluna
        valor_aluguel: imovel.valor_aluguel,
        status: imovel.status,
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
            <ModalCadImovel isOpen={isOpen} onOpenChange={onOpenChange} />
        </>
    );
}
