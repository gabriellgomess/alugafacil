import React, { useState, useContext } from 'react';
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
    Button,
    
} from "@nextui-org/react";
import { Link } from 'react-router-dom';
import { MyContext } from '../contexts/MyContext';

import LogoHorizontal from '../assets/logotipo_alugafacil_horizontal.png'



const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { logoutUser } = useContext(MyContext);
    

    const menuItems = [
        "Cadastrar Inquilino",
        "Cadastrar Imóvel",
        "Gerar Cobrança",
        "Gerar Contrato"
    ];
    return (
        <>
        <Navbar shouldHideOnScroll onMenuOpenChange={setIsMenuOpen} maxWidth='full'>
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <img width={200} src={LogoHorizontal} alt="" />
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="sm:hidden flex gap-4 justify-center">
                <NavbarItem>
                    <Link color="foreground" to='/dashboard'>
                        Dashboard
                    </Link>
                    </NavbarItem>
                    <NavbarItem>
                    <Link color="foreground" to="/imoveis">
                        Imóveis
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link href="#" aria-current="page">
                        Inquilinos
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="#">
                        Pagamentos
                    </Link>
                </NavbarItem>
            </NavbarContent>

            <NavbarContent justify="end">              
                <NavbarItem>
                    <Button onClick={logoutUser} color="primary" variant="ghost">
                        Sair
                    </Button>
                </NavbarItem>
            </NavbarContent>
            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            color={
                                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
                            }
                            className="w-full"
                            href="#"
                            size="lg"
                        >
                            {item}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar >        
        </>
    )
}

export default Header;