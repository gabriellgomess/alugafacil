import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Textarea, RadioGroup, Radio } from "@nextui-org/react";

export default function ModalCadImovel({ isOpen, onOpenChange }) {

    const [imovelData, setImovelData] = useState({
        locadorID: 1,
        cep: '',
        endereco: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        estado: '',
        valor_aluguel: '',
        descricao: '',
        quartos: '',
        banheiros: '',
        garagem: '',
        mobiliado: false,
        data_disponibilidade: '',
        status: '',
        outras_caracteristicas: ''
    });


    return (
        <>
            <Modal scrollBehavior="inside" size="5xl" isOpen={isOpen} onOpenChange={onOpenChange}>
                <form style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Cadastro de Imóvel</ModalHeader>
                                <ModalBody>
                                    <div className="flex gap-2">
                                        <Input label="Tipo" name="tipo" color="success"/>
                                        <Input label="CEP" name="cep" color="success"/>
                                    </div>
                                    <div className="flex gap-2">
                                        <Input label="Endereço" name="endereco" color="success"/>
                                        <Input label="Nº" name="numero" color="success"/>
                                    </div>
                                    <div className="flex gap-2">
                                        <Input label="Complemento" name="complemento" color="success"/>
                                        <Input label="Bairro" name="bairro" color="success"/>
                                    </div>
                                    <div className="flex gap-2">
                                        <Input label="Cidade" name="cidade" color="success"/>
                                        <Input label="Estado" name="estado" color="success"/>
                                    </div>

                                    <Textarea label="Descrição" name="descricao" color="success"/>
                                    <div className="flex gap-2">
                                        <Input label="Quartos" name="quartos" color="success"/>
                                    </div>
                                    <div className="flex gap-2">
                                        <Input label="Banheiros" name="banheiros" color="success"/>
                                        <Input label="Garagem" name="garagem" color="success"/>
                                    </div>
                                    <div className="flex gap-2">
                                        <Input label="Valor" name="valor_aluguel" color="success"/>
                                    </div>
                                    <Input label="Características Extras" name="outras_caracteristicas" color="success"/>
                                    <RadioGroup
                                        label="Mobiliado"
                                        orientation="horizontal"
                                    >
                                        <Radio value="sim">Sim</Radio>
                                        <Radio value="nao">Não</Radio>
                                    </RadioGroup>

                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onClick={onClose}>
                                        Close
                                    </Button>
                                    <Button type='submit' color="primary" onPress={onClose}>
                                        Action
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
