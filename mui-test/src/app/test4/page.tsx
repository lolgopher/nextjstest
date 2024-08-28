'use client'

import React, { useState } from 'react';
import { List, ListItem, ListItemText, Collapse, Divider, IconButton } from '@mui/material';
import { ExpandMore, ExpandLess, Folder, InsertDriveFile } from '@mui/icons-material';

// Define types for file and folder structure
type FileItem = {
  type: 'file';
  name: string;
};

type FolderItem = {
  type: 'folder';
  name: string;
  children: Array<FileItem | FolderItem>;
};

type FileSystemItem = FileItem | FolderItem;

// Define the component props type
interface FileSystemListProps {
  data: FileSystemItem[];
  width?: string;
  height?: string;
}

// The FileSystemList component
const FileSystemList: React.FC<FileSystemListProps> = ({ data, width = '100%', height = 'auto' }) => {
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({});

  const handleToggle = (folderName: string) => {
    setOpenFolders((prev) => ({
      ...prev,
      [folderName]: !prev[folderName],
    }));
  };

  const renderList = (items: FileSystemItem[], level = 0): React.ReactNode => (
    <List sx={{ pl: level * 2, width, height, overflow: 'auto' }}>
      {items.map((item) => (
        <React.Fragment key={item.name}>
          <ListItem>
            <IconButton
              onClick={() => item.type === 'folder' && handleToggle(item.name)}
              edge="start"
              aria-label="toggle"
            >
              {item.type === 'folder' ? (
                openFolders[item.name] ? (
                  <ExpandLess />
                ) : (
                  <ExpandMore />
                )
              ) : (
                <InsertDriveFile />
              )}
            </IconButton>
            <ListItemText primary={item.name} />
          </ListItem>
          {item.type === 'folder' && openFolders[item.name] && (
            <Collapse in={openFolders[item.name]}>
              {renderList((item as FolderItem).children, level + 1)}
            </Collapse>
          )}
          <Divider />
        </React.Fragment>
      ))}
    </List>
  );

  return <>{renderList(data)}</>;
};

// Example usage with width and height
const fileSystemData: FolderItem[] = [
  {
    type: 'folder',
    name: 'Documents',
    children: [
      {
        type: 'folder',
        name: 'Projects',
        children: [
          { type: 'file', name: 'project1.txt' },
          { type: 'file', name: 'project2.doc' },
        ],
      },
      { type: 'file', name: 'resume.pdf' },
    ],
  },
  {
    type: 'folder',
    name: 'Pictures',
    children: [
      { type: 'file', name: 'vacation.jpg' },
      { type: 'file', name: 'family.png' },
    ],
  },
];

export default function Home() {
  return (
    <main>
      <div>
        <FileSystemList data={fileSystemData} />
      </div>
    </main>
  );
}