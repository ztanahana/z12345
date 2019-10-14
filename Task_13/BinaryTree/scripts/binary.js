function Node(key, value){
    this.key = key;
    this.value = value;
}

function BinarySearchTree(){
    this._root = new Node();
}

BinarySearchTree.prototype = {

    //restore constructor
    constructor: BinarySearchTree,

    // returns root of the tree;
    root: function () {
        return this._root.value;
    },

    // stores specified value in tree using key; method should be chainable;
    insert: function (key, value){
        if (!this._root.key && !this._root.value){
            this._root.key = key;
            this._root.value = value;
        } else {
            this._insert(this._root, key, value);
        }

        return this;
    },

    // removes node from tree by provided key; method should be chainable;
    delete: function (key){
        return !(deleteNodeHelper(this._root, key) === false);
    },

    // looking for stored data in tree using key;
    search: function (key){
        if(!this._root) return null
        let current = this._root;

        while(current){
            if(key == current.key) {
                return current.value;
            }    
            
            if(current.right && key > current.key){
                current = current.right;
            } else {
                current = current.left;
            }
        }

        return false;
    },

    // looking for stored data in tree using key;
    contains: function (value){
        const found = this.search(value);

        if(found){
            return true;
        }
  
        return false;      
    },

    // returns ordered sequence of stored values in given order (order is boolean)
    traverse: function (order){
        let first = order ? 'left' : 'right';
        let second = order ? 'right' : 'left';
        let result = [];
        
        function step(node){
            if (node[first]) {
                step(node[first]);
            }
        
            if (node.value) {
                result.push(node.value);
            }
        
            if (node[second]) {
                step(node[second]);
            }
        }

        step(this._root);

        return result;
    },

    // verifies whether tree is well-formed binary search tree or not
    verify: function (){
        return verifyBST(this._root);
    },

    _insert: function (node, key, value){
        let next;

        if (node.key <= key) {
            if (node.right) {
                next = node.right;
            } else{
                node.right = new Node(key, value);
                return;
            } 
        } else {
            if (node.left) {
                next = node.left;
            } else {
                node.left = new Node(key, value);
                return;
            }
        }

        this._insert(next, key, value);
    }
};

function deleteNodeHelper(root, key) {
    if (root === undefined) {
       // Empty tree return false;
    }
    if (key < root.key) {
       root.left = deleteNodeHelper(root.left, key);
       return root;
    } else if (key > root.key) {
       root.right = deleteNodeHelper(root.right, key);
       return root;
    } else {
       // No children
       //case 1 - a leaf node
       if (root.left === undefined && root.right === undefined) {
          root = undefined; 
          return root;
       }
       // Single Child cases
       if (root.left === undefined) {
            root.key = root.right.key;
            root.value = root.right.value;
            root.right = undefined;
            return root;
       }
       if (root.right === undefined) {
            root.key = root.left.key;
            root.value = root.left.value;
            root.left = undefined;
            return root;
       }
       // Both children, so need to find successor 
       let currNode = root.right;
       while (currNode.left !== undefined) {
          currNode = currNode.left;
       }
       root.key = currNode.key;
       root.value = currNode.value;
       // Delete the value from right subtree.
       root.right = deleteNodeHelper(root.right, currNode.key);
       return root;
    }
 }

 let last_logged;
 function verifyBST(root) {
    
    if (root === undefined) { // base case
      return true;
    }
    
    // Verify and recurse left
    if (!verifyBST(root.left)) {
      return false;
    }
  
    // Verify the current node
    if (last_logged !== undefined && root.key <= last_logged) {
      return false;
    }
  
    last_logged = root.key;
  
    // Verify and recurse left
    if (!verifyBST(root.right)) {
      return false;
    }
  
    return true;
}