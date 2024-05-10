import { MenuItem } from '../two-column-sidebar/menu.model';

export const MENU: MenuItem[] = [
  {
    id: 1,
    label: 'MENU.INICIO',
    isTitle: true,
  },
  {
    id: 2,
    label: 'MENU.TABLERO',
    icon: 'ph-gauge',
    link: '/',
    parentId: 1,
  },
  {
    id: 3,
    label: 'MENU.ADMINISTRACION',
    isTitle: true,
  },
  {
    id: 4,
    label: 'MENU.EMPLEADOS',
    icon: ' ph-user-gear-thin',
    link: '/empleados',
    parentId: 3,
  },
  {
    id: 5,
    label: 'MENU.SUCURSALES',
    icon: ' ph-house-line-thin',
    link: '/',
    parentId: 3,
  },

  /* -------------------------------------------------------------------------- */
  /*                               configuraciones                              */
  /* -------------------------------------------------------------------------- */
  {
    id: 6,
    label: 'MENU.CONFIGURACION',
    isTitle: true,
  },
  {
    id: 7,
    label: 'MENU.CATALOGOS.TEXT',
    icon: 'ph-address-book',
    isCollapsed: true,
    collapseid: 'sidebarDashboards',
    subItems: [
      {
        id: 8,
        label: 'MENU.CATALOGOS.LIST.GENEROS',
        link: '/',
        parentId: 6,
      },
      {
        id: 9,
        label: 'MENU.CATALOGOS.LIST.CONTACTOS',
        link: '/',
        parentId: 6,
      },
      {
        id: 10,
        label: 'MENU.CATALOGOS.LIST.IDENTIFICACIONES',
        link: '/',
        parentId: 6,
      },
      {
        id: 11,
        label: 'MENU.CATALOGOS.LIST.PUESTOS',
        link: '/',
        parentId: 6,
      },
      {
        id: 12,
        label: 'MENU.CATALOGOS.LIST.EDUCACION',
        link: '/',
        parentId: 6,
      },
    ],
  },
];
