surface
first(
	float	Prob  = 0.40,				// probability of seeing orange
		Width = 0.05,				// width of each stripe`
		Ks = 0.4,				// specular coefficient
		Kd = 0.5, 				// diffuse  coefficient
		Ka = 0.1, 				// ambient  coefficient
		Roughness = 0.1;			// specular roughness
	color	SpecularColor = color( 1, 1, 1 )	// specular color
)
{
	color ORANGE = color( 1., .5, 0. );

	// be sure the normal points correctly (used for lighting):

	varying vector Nf = faceforward( normalize( N ), I );
	vector V = normalize( -I );

	// determine how many squares over and up we are in right now:

	float up = 2. * u;	// because we are rendering a sphere
	float vp = v;
	float numinu = floor( up / Width );
	float numinv = floor( vp / Width );
	
	// determine the opacity:
	// (in this case, use whatever opacity the rib file gave us)

	Oi = Os;

	// determine the unlit color:

        color TheColor = Cs;
	if( mod( numinu+numinv, 2. ) == 0 )
		TheColor = ORANGE;

	// determine the lighted output color Ci:

	Ci =        TheColor * Ka * ambient();
	Ci = Ci  +  TheColor * Kd * diffuse(Nf);
	Ci = Ci  +  SpecularColor * Ks * specular( Nf, V, Roughness );
}
