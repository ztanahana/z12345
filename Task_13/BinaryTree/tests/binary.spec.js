suite('Binary Search Tree', function (){
    let bst;
    
    setup(function (){
        bst = new BinarySearchTree();
    });

    // returns root of the tree;
    suite('root', function (){

    }); 

    // stores specified value in tree using key; method should be chainable;
    suite('insert', function () {
        test('should fill the tree', function () {
            let key = 23;
            let value = '23';
            let result;

            bst.insert(key, value);
            result = bst.root();

            expect(result).to.equal(value);
        });

        test('_insert should not be called on empty tree', function () {
            let spy = sinon.spy(bst, '_insert');
            let key = 23;
            let value = '23';

            bst.insert(key, value);

            expect(spy).not.to.have.been.called;
        });

        test('_insert should be called if tree is not empty', function () {
            let spy = sinon.spy(bst, '_insert');
            let key = 23;
            let value = '23';

            bst.insert(key, value);
            bst.insert(key, value);

            expect(spy).to.have.been.called;
        });
    });

    // removes node from tree by provided key; method should be chainable;
    suite('delete', function () {
        test('should delete node with no leaves by the given key', function () {
            let key = 23, key2 = 24, key3 = 10, key4 = 5;
            let value = '23', value2 = '24', value3 = '10', value4 = '5';
            let result;

            bst.insert(key, value);
            bst.insert(key2, value2);
            bst.insert(key3, value3);
            bst.insert(key4, value4);
            
            bst.delete(key4);
            result = bst.search(key4);

            expect(result).to.equal(false);
        });

        test('should delete node with 1 leaf by the given key', function () {
            let key = 23, key2 = 24, key3 = 10, key4 = 5;
            let value = '23', value2 = '24', value3 = '10', value4 = '5';
            let result;

            bst.insert(key, value);
            bst.insert(key2, value2);
            bst.insert(key3, value3);
            bst.insert(key4, value4);
            
            bst.delete(key3);
            result = bst.search(key3);
            expect(result).to.equal(false);
        });

        test('should delete node with 2 leaves by the given key', function () {
            let key = 23, key2 = 24, key3 = 10, key4 = 5, key5 = 11, key6 = 1, key7 = 4;
            let value = '23', value2 = '24', value3 = '10', value4 = '5', value5 = '11', value6 = '1', value7 = '4';
            let result;

            bst.insert(key, value);
            bst.insert(key2, value2);
            bst.insert(key3, value3);
            bst.insert(key4, value4);
            bst.insert(key5, value5); 
            bst.insert(key7, value7); 
            bst.insert(key6, value6); 
            
            bst.delete(key3);
            result = bst.search(key3);

            expect(result).to.equal(false);
        }); 

        test('should delete root with 1 leaf by the given key', function () {
            let key = 23, key2 = 24;
            let value = '23', value2 = '24';
            let result;

            bst.insert(key, value);
            bst.insert(key2, value2);
            
            bst.delete(key);
            result = bst.search(key);
            expect(result).to.equal(false);
        });
        
        test('should delete root with 2 leaves by the given key', function () {
            let key = 23, key2 = 24, key3 = 10, key4 = 5, key5 = 11;
            let value = '23', value2 = '24', value3 = '10', value4 = '5', value5 = '11';
            let result;

            bst.insert(key, value);
            bst.insert(key2, value2);
            bst.insert(key3, value3);
            bst.insert(key4, value4);
            bst.insert(key5, value5); 
            
            bst.delete(key);
            result = bst.search(key);
            expect(result).to.equal(false);
        });
    });

    // looking for stored data in tree using key;
    suite('search', function () {
        test('should find value by key', function () {
            let key = 23, key2 = 24, key3 = 10;
            let value = '23', value2 = '24', value3 = '10';
            let result;

            bst.insert(key, value);
            bst.insert(key2, value2);
            bst.insert(key3, value3);
            result = bst.search(key3);
            
            expect(result).to.equal(value3);
        });
    });

    // returns whether BST contains such value or not;
    suite('contains', function () {
        test('should return true if value exists', function () {
            let key = 23, key2 = 24;
            let value = '23', value2 = '24';
            let result;

            bst.insert(key, value);
            bst.insert(key2, value2);
            result = bst.contains('10');
            
            expect(result).to.equal(false);
        });

        test('should return false if value does not exist', function () {
            let key = 23, key2 = 24, key3 = 10;
            let value = '23', value2 = '24', value3 = '10';
            let result;

            bst.insert(key, value);
            bst.insert(key2, value2);
            bst.insert(key3, value3);
            result = bst.contains(key);
            
            expect(result).to.equal(true);
        });
    });

    // returns ordered sequence of stored values in given oreder (order is boolean)
    suite('traverse', function () {
        test('should return ordered sequence', function () {
            let key = 23, key2 = 24, key3 = 10;
            let value = '23', value2 = '24', value3 = '10';
            let result, 
                i,
                resultCompare = ['10','23','24'];

            bst.insert(key, value);
            bst.insert(key2, value2);
            bst.insert(key3, value3);
            
            result = bst.traverse('right');
            
            for (i=0;i<resultCompare.length;i++){
                expect(result[i]).to.equal(resultCompare[i]);
            }

        });
    });

    // verifies whether tree is well-formed binary search tree or not
    suite('verify', function () {
        test('check if tree if well-formed', function () {
            let key = 23, key2 = 24, key3 = 10;
            let value = '23', value2 = '24', value3 = '10';
            let result;

            bst.insert(key, value);
            bst.insert(key2, value2);
            bst.insert(key3, value3);
            
            result = bst.verify();
            
            expect(result).to.equal(true);
        });
    });

    teardown(function() {
    });
});