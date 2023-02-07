const MenuList = () => {
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        getDishes(setMenuItems)
    }, []);

    return (
        <ListView data={menuItems} />
    )
}

const getDishes = (successCallback) => {
    db.transaction(
        tx => {
            tx.executeSql(
                'select * from menu',
                [],
                (_, { rows: { _array } }) => {
                    successCallback(_array);
                }
            );
        },
    );
}