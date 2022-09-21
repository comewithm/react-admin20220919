import React, {useState, useEffect} from "react";
import {MenuProps} from 'antd/lib/menu'
import {Menu} from 'antd'
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd'

import {IFMenu} from '../routes/config'
import { Link } from "react-router-dom";

type SiderMenuProps = MenuProps & {
    menus: any;
    onClick: (e: any) => void
    selectedKeys:string[]
    openKeys?: string[]
    onOpenChange: (v: string[]) => void
}

const renderMenuItem = (item:IFMenu) => (
    <Menu.Item key={item.key}>
        <Link 
            to={(item.route || item.key) + (item.query || '')}
        >
            <span className="nav-text">{item.title}</span>
        </Link>
    </Menu.Item>
)

const renderSubMenu = (item:IFMenu) => (
    <Menu.SubMenu
        key={item.key}
        title={
            <span>
                <span className="nav-text">{item.title}</span>
            </span>
        }
    >
        {
            item.subs!.map(sub => (sub.subs ? renderSubMenu(sub) : renderMenuItem(sub)))
        }
    </Menu.SubMenu>
)

const SiderMenu = ({menus, ...props}: SiderMenuProps) => {
    const [dragItems, setDragItems] = useState<any>([])

    const reorder = (
        list:any,
        startIndex:number,
        endIndex:number
    ) => {
        const result = Array.from(list)
        const [removed] = result.splice(startIndex, 1)
        result.splice(endIndex, 0, removed)
        return result
    }

    const onDragEnd = (result:any) => {
        if(!result.destination) return

        const items = reorder(
            dragItems,
            result.source.index,
            result.destination.index
        )

        setDragItems(items)
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
                {
                    (provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {
                                dragItems.map((item:IFMenu, index:number) => (
                                    <Draggable
                                        key={item.key}
                                        draggableId={item.key}
                                        index={index}
                                    >
                                        {
                                            (provided, _) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.dragHandleProps}
                                                    {...provided.draggableProps}
                                                    onDragStart={(e:React.DragEvent<any>) => 
                                                        provided.dragHandleProps &&
                                                        provided.dragHandleProps.onDragStart(e as any)
                                                    }
                                                >
                                                    <Menu {...props}>
                                                        {
                                                            item.subs
                                                            ? renderSunMenu(item)
                                                            : renderMenuItem(item)
                                                        }
                                                    </Menu>
                                                </div>
                                            )
                                        }
                                    </Draggable>
                                ))
                            }
                        </div>
                    )
                }

            </Droppable>
        </DragDropContext>
    )
}

export default React.memo(SiderMenu)