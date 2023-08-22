import React, { useState, useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Textarea, RadioGroup, Radio } from "@nextui-org/react";
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';


export default function ModalCadImovel({ isOpen, onOpenChange, idUser, selectedImovel }) {

    const [editedImovel, setEditedImovel] = useState(selectedImovel);

    const { handleSubmit, control } = useForm();
    const onSubmit = (data) => {
        data.locadorId = idUser;
        console.log(data);
        axios.post('https://alugafacil.tech/api/gera_imovel.php', data)
            .then(response => {
                console.log(response)
            })
    };

    // Function to handle changes to the edited property
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditedImovel((prevImovel) => ({
            ...prevImovel,
            [name]: value,
        }));
        console.log(editedImovel);
    };

    useEffect(() => {
        setEditedImovel(selectedImovel);
    }, []);


    return (
        <>
            <Modal scrollBehavior="inside" size="5xl" isOpen={isOpen} onOpenChange={onOpenChange}>
                <form style={{ display: 'flex', flexDirection: 'column', gap: '10px' }} onSubmit={handleSubmit(onSubmit)}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Cadastro de Imóvel {idUser}</ModalHeader>
                                <ModalBody>
                                    <div className="flex gap-2">
                                        <Controller
                                            name="endereco"
                                            control={control}
                                            defaultValue={editedImovel?.endereco || ""}
                                            render={({ field }) => <Input {...field} label="Endereço" color="success" />}
                                            onChange={handleInputChange}
                                        />
                                        <Controller
                                            name="numero"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => <Input {...field} label="Nº" color="success" />}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <Controller
                                            name="complemento"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => <Input {...field} label="Complemento" color="success" />}
                                            onChange={handleInputChange}
                                        />
                                        <Controller
                                            name="bairro"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => <Input {...field} label="Bairro" color="success" />}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <Controller
                                            name="cidade"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => <Input {...field} label="Cidade" color="success" />}
                                            onChange={handleInputChange}
                                        />
                                        <Controller
                                            name="estado"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => <Input {...field} label="Estado" color="success" />}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <Controller
                                        name="descricao"
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => <Textarea {...field} label="Descrição" color="success" />}
                                        onChange={handleInputChange}
                                    />
                                    <div className="flex gap-2">
                                        <Controller
                                            name="quartos"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => <Input {...field} label="Quartos" color="success" />}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <Controller
                                            name="banheiros"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => <Input {...field} label="Banheiros" color="success" />}
                                            onChange={handleInputChange}
                                        />
                                        <Controller
                                            name="garagem"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => <Input {...field} label="Garagem" color="success" />}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <Controller
                                            name="valor_aluguel"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => <Input {...field} label="Valor" color="success" />}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <Controller
                                        name="outras_caracteristicas"
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => <Input {...field} label="Características Extras" color="success" />}
                                        onChange={handleInputChange}
                                    />
                                    <Controller
                                        name="mobiliado"
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => (
                                            <RadioGroup label="Mobiliado" orientation="horizontal">
                                                <Radio {...field} value="sim">Sim</Radio>
                                                <Radio {...field} value="nao">Não</Radio>
                                            </RadioGroup>
                                        )}
                                        onChange={handleInputChange}
                                    />

                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onClick={onClose}>
                                        Fechar
                                    </Button>
                                    <Button type='submit' color="primary" onPress={onClose}>
                                        Cadastrar
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </form>
            </Modal>
        </>
    );
}
