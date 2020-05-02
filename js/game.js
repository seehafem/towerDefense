/* Game namespace */
var game = {

    // an object where to store game information
    data : {
        // score
        score : 0,
		// Player life balance
		life : 0
    },


    // Run on page load.
    "onload" : function () {
        // Initialize the video.
        if (!me.video.init(TILE_WIDTH*TILE_COUNT_WIDTH, TILE_HEIGHT*TILE_COUNT_HEIGHT, {wrapper : "screen", scale : "auto", scaleMethod : "fit"})) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }

        // Initialize the audio.
        me.audio.init("mp3,ogg");

        // set and load all resources.
        // (this will also automatically switch to the loading screen)
        me.loader.preload(game.resources, this.loaded.bind(this));
    },

    // Run on game resources loaded.
    "loaded" : function () {
        me.state.set(me.state.MENU, new game.TitleScreen());
        me.state.set(me.state.INFO, new game.InstructionScreen());
        me.state.set(me.state.PLAY, new game.PlayScreen());

        // Add our player entity in the entity pool
        me.pool.register("mainPlayer", game.PlayerEntity);

        // Add the enemy skeleton objects to the entity pool
        me.pool.register("clothedSkeleton", game.ClothedSkeleton);
        me.pool.register("robedSkeleton", game.RobedSkeleton);
        me.pool.register("armoredSkeleton", game.ArmoredSkeleton);
        me.pool.register("dyingSkeleton", game.DyingSkeleton);

        // Add the entity that manages waves within a level
        me.pool.register("waveManager", game.WaveManager);

        // Add the turn collision objects to the entity pool
        me.pool.register("DownTurn", game.DownTurn);
        me.pool.register("UpTurn", game.UpTurn);
        me.pool.register("RightTurn", game.RightTurn);
        me.pool.register("LeftTurn", game.LeftTurn);

        // Add the tower objects to the entity pool
        me.pool.register("TowerNode", game.TowerNode);
        me.pool.register("TowerSelectedNode", game.TowerSelectedNode);
        me.pool.register("TowerMenuItem", game.TowerMenuItem);
        me.pool.register("RangeTower", game.RangeTower);
        me.pool.register("StunTower", game.StunTower);
        me.pool.register("ExplodeTower", game.ExplodeTower);
		
		// Add the projectile objects (launched by towers) to the entity pool.
		me.pool.register("missile", game.Missile);
		me.pool.register("bomb", game.Bomb);
		// Add a static position marker used by the ExplodeTower to shoot a bomb at a fixed position.
		me.pool.register("positionMarker", game.PositionMarker);
		// Add a stun effect visual used by the StunTower when it launches attacks.
		me.pool.register("stunEffect", game.StunEffect);
		// Add an explosion effect visual used by the ExplodeTower bombs after they impact a target.
		me.pool.register("explosionEffect", game.ExplosionEffect);
		// Add a static decal effect marking where a projectile (missile) hit the ground.
		me.pool.register("groundDecal", game.GroundDecal);

        // Add the spawn point and finishing zone to the game
        me.pool.register("Start", game.Start);
        me.pool.register("Finish", game.Finish);

        // Enable the keyboard for the tower attack target POC.
        me.input.bindKey(me.input.KEY.SPACE,  "shoot", true);
        me.input.unbindKey(me.input.KEY.SPACE);

        // Start the game.
        me.state.change(me.state.MENU);
    }
};

game.functions =
{
    //remove all menu objects
    removeMenu: function(childName)
    {
        var menuObjects = me.game.world.getChildByName(childName);

        // Remove objects from world
        for (var i = 0; i < menuObjects.length; i++)
            me.game.world.removeChild(menuObjects[i]);
    }
}
